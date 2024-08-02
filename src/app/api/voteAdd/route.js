import { MongoClient } from "mongodb";

// Replace with your MongoDB connection string
const uri = process.env.mongo_uri;
const client = new MongoClient(uri);

const dbName = process.env.mongo_db_name;
const collectionName = process.env.mongo_collection_name;

export const POST = async (req) => {
  const { title } = await req.json();

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Find the voting document with the specified title
  const voting = await collection.findOne({ title });

  if (voting) {
    // If found, increment the vote

    await collection.updateOne({ title }, { $inc: { vote: 1 } });
  } else {
    // If not found, insert a new document

    await collection.insertOne({ title, vote: 1 });
  }

  return new Response("", { status: 200 });
};
