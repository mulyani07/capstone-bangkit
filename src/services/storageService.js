const tf = require('@tensorflow/tfjs-node');

async function loadModelFromCloud() {
    const modelUrl = process.env.CLOUD_MODEL_URL; // URL Cloud Storage
    return await tf.loadLayersModel(modelUrl);
}

module.exports = { loadModelFromCloud };
