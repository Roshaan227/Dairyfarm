import express from 'express';
import MilkProduction from '../models/MilkProduction.js';
import {
  getMilkRecords,
  createMilkRecord,
} from '../controllers/milkController.js';

const router = express.Router();

router.get('/', getMilkRecords);
router.post('/', createMilkRecord);

// DELETE /api/milk/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await MilkProduction.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.json({ success: true, message: 'Milk record deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;