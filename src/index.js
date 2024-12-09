require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { loadModelFromCloud } = require('./services/storageService');
const { savePredictionToFirestore } = require('./services/firestoreService');
const { predictImage } = require('./utils/modelUtils');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer Setup for File Upload
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: Upload Image and Predict
app.post('/predict', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'Image file is required' });
        }

        // Resize image
        const sharp = require('sharp');
        const buffer = await sharp(req.file.buffer).resize(224, 224).toBuffer();

        // Load model and predict
        const model = await loadModelFromCloud();
        const prediction = await predictImage(model, buffer);

        // Example recipes based on prediction
        const recipes = [
            { id: 1, name: 'Recipe A', ingredients: ['A', 'B'], instructions: 'Do this' },
            { id: 2, name: 'Recipe B', ingredients: ['X', 'Y'], instructions: 'Do that' },
            { id: 3, name: 'Recipe C', ingredients: ['M', 'N'], instructions: 'Do something' }
        ];

        // Save result to Firestore
        const result = await savePredictionToFirestore(prediction, recipes);

        res.status(200).send({
            message: 'Prediction successful',
            prediction,
            recipes,
            firestoreId: result.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
