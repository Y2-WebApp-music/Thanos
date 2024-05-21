import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://Guynut:1234@clustercapstone.ssajl5d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCapstone"

const client = new MongoClient(url);

let db;
let collectionChat;

async function connect() {
    await client.connect();
    console.log('')
    console.log("==> Connected to MongoDB");
    db = client.db("Capstone");
    collectionChat = db.collection("ChatRoom");
}

// ======================
//  Chat Room GET and POST
// ======================
export async function createChat(uid, document) {
    try {
        await connect();
        const result = await collectionChat.insertOne({ uid, ...document });
        console.log('createChat _id:', result);
        close();
        return result;
    } catch (error) {
        console.error("Error createChat :", error);
        throw error;
    }
}
export async function readChat(uid) {
    try {
        await connect();
        const documents = await collectionChat.find({ uid }).sort({ TimeCreated: -1 }).toArray();
        console.log(" >> readChat <<");
        close()
        return documents;
    } catch (error) {
        console.error("Error readChat documents:", error);
        throw error;
    }
}
export async function updateChatName(uid,chatId, update) {
    try {
        await connect();
        console.log('update ==> ',update)
        const result = await collectionChat.updateOne(
            { _id: new ObjectId(chatId), uid},
            { $set: {name: update} }
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
        const result = await collectionChat.deleteOne({ _id: new ObjectId(chatId), uid });
        console.log(`deleteChat _id: ${chatId}`);
        close();
    } catch (error) {
        console.error("Error deleteDocument :", error);
        throw error;
    }
}

// ======================
//  Messages GET and POST
// ======================
export async function readMessages(id, uid) {
    try {
        await connect();
        const result = await collectionChat.findOne({ _id: new ObjectId(id), uid });
        console.log(`readMessages: ${id}`);
        close();
        return result;
    } catch (error) {
        console.error("Error readMessages:", error);
        throw error;
    }
}

export async function addMessage(id, document) {
    try {
        await connect();
        console.log('id : ',id)
        console.log('document : ',document)
        const result = await collectionChat.updateOne(
            { _id: new ObjectId(id) },
            { $set: {messages:document} }
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