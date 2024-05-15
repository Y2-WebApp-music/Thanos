const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node'); // Or use 'torch' for PyTorch models

const app = express();
app.use(cors());
app.use(bodyParser.json());

let model;
async function loadModel() {
    model = await tf.loadLayersModel('file://path_to_your_model/model.json');
}
loadModel();

app.post('/predict', async (req, res) => {
    const inputs = tf.tensor(req.body.inputs);
    const predictions = model.predict(inputs);
    res.json(predictions.arraySync());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
