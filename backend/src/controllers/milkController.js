import MilkProduction from '../models/MilkProduction.js';

// Get all milk production history sorted by newest date first
export const getMilkRecords = async (req, res) => {
  try {
    const records = await MilkProduction.find().sort({ date: -1 });
    return res.status(200).json({ success: true, records });
  } catch (error) {
    console.error('Error fetching milk records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch milk production records',
      error: error.message,
    });
  }
};

// Create or update daily milk production record
export const createMilkRecord = async (req, res) => {
  try {
    const { date, morning, evening, price } = req.body;

    if (
      !date ||
      morning === undefined ||
      evening === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date, morning, evening, and price values.',
      });
    }

    const morningNum = Number(morning);
    const eveningNum = Number(evening);
    const priceNum = Number(price);

    const total = morningNum + eveningNum;
    const revenue = total * priceNum;

    // Upsert logic: If record for this date exists, update it; otherwise create a new one
    const record = await MilkProduction.findOneAndUpdate(
      { date },
      { date, morning: morningNum, evening: eveningNum, total, price: priceNum, revenue },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(201).json({
      success: true,
      message: 'Milk record saved successfully',
      record,
    });
  } catch (error) {
    console.error('Error saving milk record:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to save milk record',
    });
  }
};