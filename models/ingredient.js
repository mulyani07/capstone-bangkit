const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }, // e.g., "200 grams"
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);


module.exports = Ingredient;
