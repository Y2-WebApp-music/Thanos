import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://Guynut:1234@clustercapstone.ssajl5d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCapstone"

const client = new MongoClient(url);

let db;
let collectionChat;
let collectionMessages;

async function connect() {
    await client.connect();
    console.log('')
    console.log("==> Connected to MongoDB");
    db = client.db("Capstone");
}

// ======================
//  Chat Room GET and POST
// ======================
export async function createChat(uid, document) {
    try {
        await connect();
        collectionChat = db.collection("ChatRoom");
        const result = await collectionChat.insertOne({ uid, ...document });
        console.log(`createChat _id: ${result.insertedId}`);
        close();
    } catch (error) {
        console.error("Error createChat :", error);
        throw error;
    }
}
export async function readChat(uid) {
    try {
        await connect();
        collectionChat = db.collection("ChatRoom");
        const documents = await collectionChat.find({ uid }).toArray();
        console.log(" >> readChat <<");
        close()
        return documents;
    } catch (error) {
        console.error("Error readChat documents:", error);
        throw error;
    }
}
export async function updateChatName(uid, chatId, update) {
    try {
        await connect();
        collectionChat = db.collection("ChatRoom");
        const result = await collectionChat.updateOne(
            { _id: new ObjectId(chatId), uid },
            { $set: update }
        );
        console.log(`updateChatName _id: ${chatId}`);
        close();
    } catch (error) {
        console.error("Error updateDocument :", error);
        throw error;
    }
}

export async function deleteChat(uid, chatId) {
    try {
        await connect();
        collectionChat = db.collection("ChatRoom");
        console.log("uid : ",uid)
        console.log("id : ",documentId)
        const result = await collectionChat.deleteOne({ _id: new ObjectId(chatId), uid });
        console.log(`deleteChat _id: ${documentId}`);
        close();
    } catch (error) {
        console.error("Error deleteDocument :", error);
        throw error;
    }
}

// ======================
//  Messages GET and POST
// ======================
export async function createMessages(chatId, document) {
    try {
        await connect();
        collectionMessages = db.collection("Messages");
        const result = await collectionMessages.insertOne({ chatId, ...document });
        console.log(`createMessages _id: ${result.insertedId}`);
        close();
    } catch (error) {
        console.error("Error createMessages :", error);
        throw error;
    }
}
export async function readMessage( chatId ) {
    try {
        await connect();
        collectionMessages = db.collection("Messages");
        const documents = await collectionMessages.find({ chatId }).toArray();
        console.log(" >> readMessage <<");
        close()
        return documents;
    } catch (error) {
        console.error("Error readMessage documents:", error);
        throw error;
    }
}
export async function addMessage(chatId, document) {
    try {
        await connect();
        collectionMessages = db.collection("Messages");
        const result = await collectionMessages.updateOne(
            { _id: new ObjectId(chatId) },
            { $set: document }
        );
        console.log(`addMessage _id: ${result.insertedId}`);
        close();
    } catch (error) {
        console.error("Error addMessage :", error);
        throw error;
    }
}

async function close() {
    await client.close();
    console.log("Closed connection to MongoDB ==>");
    console.log('')
}