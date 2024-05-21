import { NextResponse } from "next/server";

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request) {
  async function run() {
    try {
      await client.connect();
      // database and collection code goes here
      // insert code goes here
      // display the results of your operation
      const db = client.db("feedback-db");
      const coll = db.collection("feedback-collection1");
      const result = await coll.find({}).toArray();
      return result;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  const data = await run().catch(console.dir);
  return NextResponse.json({
    status: 200,
    data,
  });
}

export async function POST(request) {
  const data = await request.json();
  async function run() {
    try {
      await client.connect();
      // database and collection code goes here
      // insert code goes here
      // display the results of your operation
      const db = client.db("feedback-db");
      const coll = db.collection("feedback-collection1");
      const doc = {
        // _id: doc._id,
        type: "Feature",
        geometry: {
          "type": "Point",
          "coordinates": [data.longitude, data.latitude]
        },
        properties: {
          userCity: data.city,
          userRegion: data.region,
          userName: data.name,
          userMessage: data.message
        }
      };
      const result = await coll.insertOne(doc);
      // display the results of your operation
      console.log(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  return NextResponse.json({
    message: "Hello World",
    status: 200,
  });
}
