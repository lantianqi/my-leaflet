const { MongoClient } = require("mongodb");

// Define the reformatting function
function reformatDocument(doc) {
  // Create a new document with the desired structure
  if (doc.userLatitude == "" || doc.userLongitude == "") {
    return null;
  }
  var newDoc = {
    // _id: doc._id,
    type: "Feature",
    geometry: {
      "type": "Point",
      "coordinates": [doc.userLongitude, doc.userLatitude]
    },
    properties: {
      userCity: doc.userCity,
      userRegion: doc.userRegion,
      userName: doc.displayName,
      userMessage: doc.message
    }
  };
  return newDoc;
}

async function main() {
  const uri = "mongodb+srv://feedback-map-admin:38mOPuEhtY3CnTYs@feedback-map-cluster.lvynzsc.mongodb.net/?retryWrites=true&w=majority&appName=feedback-map-cluster";
  const client = new MongoClient(uri,
    // { useNewUrlParser: true, useUnifiedTopology: true }
  );
  try {
    await client.connect();

    const db = client.db("feedback-db");
    const sourceCollection = db.collection("feedback-collection");
    const targetCollection = db.collection("feedback-collection-new");

    // Read data from the source collection
    const cursor = sourceCollection.find({}).batchSize(100);;

    for await (const doc of cursor) {
      const newDoc = reformatDocument(doc);
      if (newDoc != null) {
        await targetCollection.insertOne(newDoc);
      }
    }
    console.log("All documents have been processed");
  }
  catch (error) {
    if (error.name === 'MongoExpiredSessionError') {
      console.error('Session expired. Reconnecting...');
  } else {
      console.error('An error occurred:', error);
  }
  } finally {
    await client.close();
  }
}

main().catch(console.error);