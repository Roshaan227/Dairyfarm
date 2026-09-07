import express from 'express'
import {
  getAnimals,
  createAnimal,
  deleteAnimal,
} from '../controllers/animalController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Route
router.get('/', getAnimals)

// Protected Admin Routes
router.post('/', protect, createAnimal)
router.delete('/:id', protect, deleteAnimal)

export default router