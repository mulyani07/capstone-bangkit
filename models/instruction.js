const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Instruction', instructionSchema);
