import mongoose from 'mongoose';

const milkProductionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required'],
      unique: true, // Prevents duplicate entries for the same date
    },
    morning: {
      type: Number,
      required: [true, 'Morning milk yield is required'],
      min: [0, 'Milk yield cannot be negative'],
    },
    evening: {
      type: Number,
      required: [true, 'Evening milk yield is required'],
      min: [0, 'Milk yield cannot be negative'],
    },
    total: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Price per liter is required'],
      min: [0, 'Price cannot be negative'],
    },
    revenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MilkProduction', milkProductionSchema);