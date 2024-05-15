import express, { json } from 'express'
import cors from 'cors'
import { readChat, updateChatName, deleteChat, readMessage, addMessage, createChat, createMessages } from './mongo';
const tf = require('@tensorflow/tfjs-node'); // Or use 'torch' for PyTorch models

const app = express();
app.use(cors());
app.use(bodyParser.json());

let model;
async function loadModel() {
    model = await tf.loadLayersModel('file://path_to_your_model/model.json');
}
loadModel();

// ============
//  Model POST
// ============
app.post('/predict', async (req, res) => {
    const inputs = tf.tensor(req.body.inputs);
    const predictions = model.predict(inputs);
    res.json(predictions.arraySync());
});

// ======================
//  Chat Room GET and POST
// ======================
app.post('/addChatRoom', (req, res)=>{
    const uid = req.query.uid;
    const document = req.body;
    createChat(uid,document)
    .catch(err => res.json(err))
})
app.get('/chatroom', async (req, res) => {
    const uid = req.query.uid;
    readChat(uid)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.post('/updateChatName', async (req, res) => {
    const uid = req.query.uid;
    const chatId = req.query.chatId;
    const update = req.query.uid;
    updateChatName(uid, chatId, update)
    .catch(err => res.json(err))
})
app.post('/deletePlan', (req, res)=>{
    const uid = req.query.uid;
    const chatId = req.query.chatId;
    deleteChat(uid, chatId)
    .catch(err => res.json(err))
})
// ======================
//  Messages GET and POST
// ======================
app.post('/newMessageRoom', (req, res)=>{
    const chatId = req.query.chatId;
    const document = req.body;
    createMessages(chatId, document)
    .catch(err => res.json(err))
})
app.get('/messages', async (req, res) => {
    const chatId = req.query.chatId;
    readMessage(chatId)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.post('/addMessages', (req, res)=>{
    const chatId = req.query.chatId;
    const document = req.body;
    addMessage(chatId, document)
    .catch(err => res.json(err))
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
