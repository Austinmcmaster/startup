const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const leaderboardCollection = db.collection('leaderboard');
const tableCollection = db.collection("entrytable");
const userCollection = db.collection("user");


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


async function addEntry(entry){
  const result = await tableCollection.insertOne(entry);
  return result;
}

function getEntries(userid){
  const query = {UserID: userid};
  const cursor = tableCollection.find(query);
  return cursor.toArray();

}


module.exports = {addEntry, getEntries};