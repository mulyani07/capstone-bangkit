const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');
const ingredientsRoutes = require('./routes/ingredients');
const instructionsRoutes = require('./routes/instructions');
const authMiddleware = require('./middleware/auth');


const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017/recipe-db';

// Middleware
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/instructions', instructionsRoutes);
app.use('/api/recipes', authMiddleware, recipesRoutes);

// Koneksi ke MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Tambahkan route untuk endpoint "/"
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Recipe API!" });
  });
  
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

// Jalankan server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });