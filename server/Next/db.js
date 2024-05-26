import express, { json } from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware';
import { readChat, updateChatName, deleteChat, createChat, readMessages, addMessage } from './mongo.js';

const app = express();
app.use(cors());
app.use(json())
app.use('/api', createProxyMiddleware({
    target: 'https://thanospython-k3y2okp23a-as.a.run.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));
// ======================
//  Chat Room GET and POST
// ======================
app.get('/', (req, res)=>{
    res.send('Hello from mongoDB Server')
})
app.post('/addChatRoom', (req, res)=>{
    const uid = req.query.uid;
    const document = req.body;
    createChat(uid,document)
    .then(data => res.json(data))
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
    const update = req.query.update;
    updateChatName(uid, chatId, update)
    .catch(err => res.json(err))
})
app.post('/deleteChat', (req, res)=>{
    const uid = req.query.uid;
    const chatId = req.query.chatId;
    deleteChat(uid, chatId)
    .catch(err => res.json(err))
})
// ======================
//  Messages GET and POST
// ======================
app.get('/messages', async (req, res) => {
    const id = req.query.id;
    const uid = req.query.uid;
    readMessages(id, uid)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.post('/addMessage', (req, res)=>{
    const id = req.query.id;
    const document = req.body;
    addMessage(id ,document)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
