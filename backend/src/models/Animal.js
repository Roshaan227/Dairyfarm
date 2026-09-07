import mongoose from 'mongoose'

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Animal name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Animal type is required (e.g., Cow, Buffalo, Goat)'],
      trim: true,
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    tag: { type: String, unique: true, sparse: true }, // sparse allows multiple nulls
  
  },
  {
    timestamps: true,
  }
)

const Animal = mongoose.model('Animal', animalSchema)

export default Animal