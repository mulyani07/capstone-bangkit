const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

async function savePredictionToFirestore(prediction, recipes) {
    const docRef = firestore.collection('predictions').doc();
    await docRef.set({
        prediction,
        recipes,
        timestamp: new Date()
    });
    return docRef;
}

module.exports = { savePredictionToFirestore };
