const express = require('express');
const Instruction = require('../models/instruction');
const router = express.Router();

// Create a new instruction
router.post('/', async (req, res) => {
  const { step, description } = req.body;
  const instruction = new Instruction({ step, description });
  try {
    const newInstruction = await instruction.save();
    res.status(201).json(newInstruction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
