import Animal from '../models/Animal.js'

// @desc    Get all animals (Public - Gallery)
// @route   GET /api/animals
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      count: animals.length,
      animals,
    })
  } catch (error) {
    console.error('Error fetching animals:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve animals',
    })
  }
}

// @desc    Add a new animal (Admin Only)
// @route   POST /api/animals
export const createAnimal = async (req, res) => {
  try {
    const { name, type, breed, image, tag } = req.body;

    // Generate fallback tag if omitted to avoid null conflict
    const animalTag = tag || `TAG-${Date.now()}`;

    const animal = await Animal.create({
      name,
      type,
      breed,
      image,
      tag: animalTag,
    });

    return res.status(201).json({ success: true, animal });
  } catch (error) {
    console.error('SERVER ERROR WHEN CREATING ANIMAL:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create animal entry',
      errorDetails: error,
    });
  }
};

// @desc    Delete an animal (Admin Only)
// @route   DELETE /api/animals/:id
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      })
    }

    await animal.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Animal removed successfully',
    })
  } catch (error) {
    console.error('Error deleting animal:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete animal',
    })
  }
}