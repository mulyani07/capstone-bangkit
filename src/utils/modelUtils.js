const tf = require('@tensorflow/tfjs-node');

async function predictImage(model, imageBuffer) {
    const tensor = tf.node.decodeImage(imageBuffer, 3)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(255.0);

    const predictions = model.predict(tensor).dataSync();
    const predictedClass = predictions.indexOf(Math.max(...predictions));

    return predictedClass; // Kembalikan ID kelas prediksi
}

module.exports = { predictImage };
