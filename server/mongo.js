import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://Guynut:<password>@clustercapstone.ssajl5d.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCapstone"

const client = new MongoClient(url);

let db;
let collection;

async function connect() {
    await client.connect();
    console.log('')
    console.log("==> Connected to MongoDB");
    db = client.db("Plan");
    collection = db.collection("Plans");
}

async function close() {
    await client.close();
    console.log("Closed connection to MongoDB ==>");
    console.log('')
}