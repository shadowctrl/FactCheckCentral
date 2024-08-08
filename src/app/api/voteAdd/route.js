import { MongoClient } from "mongodb";

const uri = process.env.mongo_uri;
let client;
let clientPromise;

if (uri) {
  client = new MongoClient(uri);

  // Add event listeners for logging connection events
  client.on("open", () => {
    console.log("MongoDB client connected");
  });

  global._mongoClientPromise = client.connect();
  clientPromise = global._mongoClientPromise;
}

const dbName = process.env.mongo_db_name;
const collectionName = process.env.mongo_collection_name;

export const POST = async (req) => {
  try {
    const { title } = await req.json();

    // Ensure the client is connected
    const connection = await clientPromise;
    const db = connection.db(dbName);
    const collection = db.collection(collectionName);

    // Check if the title exists in the collection
    const voting = await collection.findOne({ title });

    if (voting) {
      // If found, increment the vote count
      await collection.updateOne({ title }, { $inc: { vote: 1 } });
    } else {
      // If not found, insert a new document with initial vote count
      await collection.insertOne({ title, vote: 1 });
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
