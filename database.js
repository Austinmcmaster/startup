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

function deleteEntries(UserID){
  const query = {UserID: UserID};
  tableCollection.deleteMany(query);
}

function getLeaderboard(){
  return leaderboardCollection.find();
}

function updateLeaderboard(timeEntry){
  const query = {UserID : timeEntry.UserID}
  var leaderboardObject = leaderboardCollection.findOne(query);

  if(leaderboardObject == null){
    leaderboardCollection.insertOne(timeEntry);
  }
  else{
    let prevEntry = leaderboardCollection.findOne(query);
  if(prevEntry.Time < timeEntry.Time){
    leaderboardCollection.deleteOne(query);
    leaderboardCollection.insertOne(timeEntry);
    }
  }

  var leaderboard_table = leaderboardCollection.find().toArray();
  return leaderboard_table;
}


module.exports = {addEntry, getEntries, deleteEntries, getLeaderboard,updateLeaderboard};