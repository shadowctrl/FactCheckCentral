import { MongoClient } from "mongodb";

const uri = process.env.mongo_uri;
let client;
let clientPromise;

if (uri) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

const dbName = process.env.mongo_db_name;
const collectionName = process.env.mongo_collection_name;

export const POST = async (req) => {
  const { title } = await req.json();

  const connection = await clientPromise;
  const db = connection.db(dbName);
  const collection = db.collection(collectionName);

  const voting = await collection.findOne({ title });

  if (voting) {
    await collection.updateOne({ title }, { $inc: { vote: 1 } });
  } else {
    await collection.insertOne({ title, vote: 1 });
  }

  return new Response("", { status: 200 });
};
