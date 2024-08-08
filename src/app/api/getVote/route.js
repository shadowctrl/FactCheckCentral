import { MongoClient } from "mongodb";

// Replace with your MongoDB connection string
const uri = process.env.mongo_uri;
let client;
let clientPromise;

const dbName = process.env.mongo_db_name;
const collectionName = process.env.mongo_collection_name;

// Create a MongoDB client and connect if not already connected
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export const POST = async (req) => {
  try {
    const { title } = await req.json();

    // Wait for the MongoDB client to connect
    const connectedClient = await clientPromise;
    const db = connectedClient.db(dbName);
    const collection = db.collection(collectionName);

    // Find the voting document with the specified title
    const vote = await collection.findOne({ title });

    if (vote) {
      // If the title is found, return the vote count
      return new Response(JSON.stringify({ vote: vote.vote, title: title }), {
        status: 200,
      });
    } else {
      // If the title is not found, return a 404 Not Found status
      return new Response("Title not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching vote:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
