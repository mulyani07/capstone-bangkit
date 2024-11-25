const express = require('express');
const Ingredient = require('../models/ingredient'); // Pastikan path ke model benar
const router = express.Router();

// Create a new ingredient
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const ingredient = new Ingredient({ name, quantity });
  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all ingredients (tambahkan ini untuk pengujian GET)
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
