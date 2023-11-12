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

async function addUser(User){
  const query = {UserID: User.UserID, username:User.username, email: User.email, password: User.password }

  var check = await userCollection.findOne(query);
  if(check == null){
    const result = await userCollection.insertOne(User);
    return result;
  }
  return null;

}

async function getUser(User){
  const query = {UserID: User.UserID, username:User.username, email: User.email, password: User.password }
  var check = await userCollection.findOne(query);
  if(check != null){
    return User
  }
  return null;
}


async function addEntry(entry){
  const result = await tableCollection.insertOne(entry);
  return result;
}

async function getEntries(userid){
  const query = {UserID: userid};
  const cursor = await tableCollection.find(query);
  return cursor.toArray();

}

function deleteEntries(UserID){
  const query = {UserID: UserID};
  tableCollection.deleteMany(query);
}

async function getLeaderboard(){
  var leaderboard = await leaderboardCollection.find();
  return leaderboard.toArray();
}

async function updateLeaderboard(timeEntry){
  const query = {UserID : timeEntry.UserID}
  var leaderboardObject = await leaderboardCollection.findOne(query);

  if(leaderboardObject == null){
    await leaderboardCollection.insertOne(timeEntry);
  }
  else {
    if(leaderboardObject.Time < timeEntry.Time){
      await leaderboardCollection.deleteOne(query);
      await leaderboardCollection.insertOne(timeEntry);
    }
  }
  var leaderboard = await leaderboardCollection.find().toArray();
    leaderboard.sort(function(a,b){b.Time - a.Time});
    leaderboard.reverse();
    if(leaderboard.length > 10){
      leaderboard.length = 10;
    }
    await leaderboardCollection.deleteMany();
    await leaderboardCollection.insertMany(leaderboard);
}


module.exports = {getUser,addEntry, getEntries, deleteEntries, getLeaderboard,updateLeaderboard, addUser};