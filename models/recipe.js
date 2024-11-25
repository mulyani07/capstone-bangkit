const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);
