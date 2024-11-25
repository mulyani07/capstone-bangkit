const express = require('express');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const Instruction = require('../models/instruction');
const User = require('../models/user');
const router = express.Router();

// Create a new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, userId, category } = req.body;

  // Validasi user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Cek bahan-bahan
  const ingredientIds = await Ingredient.find({ '_id': { $in: ingredients } });
  if (ingredientIds.length !== ingredients.length) {
    return res.status(404).json({ message: 'Some ingredients not found' });
  }

  // Cek instruksi
  const instructionIds = await Instruction.find({ '_id': { $in: instructions } });
  if (instructionIds.length !== instructions.length) {
    return res.status(404).json({ message: 'Some instructions not found' });
  }

  // Buat resep
  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    user: userId,
    category,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
