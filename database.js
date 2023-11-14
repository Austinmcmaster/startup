const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const leaderboardCollection = db.collection('leaderboard');
const tableCollection = db.collection("entrytable");
const userCollection = db.collection("user");
const bcrypt = require('bcrypt');
const uuid = require('uuid');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addUser(email, password, username){
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username : username,
    password : passwordHash,
    token: uuid.v4(),
  }
  await userCollection.insertOne(user);
  return user;
}

function getUser(email){
  const query = { email: email}
  return userCollection.findOne(query);
}

function getUserByToken(token){
  return userCollection.findOne({token: token})
}


async function addEntry(entry){
  const result = await tableCollection.insertOne(entry);
  return result;
}

async function getEntries(id){
  const query = {id: id};
  const cursor = await tableCollection.find(query);
  return cursor.toArray();

}

function deleteEntries(id){
  const query = {id: id};
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
    leaderboard.sort(function(a,b){a.Time - b.Time});
    leaderboard.reverse();
    if(leaderboard.length > 10){
      leaderboard.length = 10;
    }
    await leaderboardCollection.deleteMany();
    await leaderboardCollection.insertMany(leaderboard);
}


module.exports = {getUser,addEntry, getEntries, deleteEntries, getLeaderboard,updateLeaderboard, addUser,getUserByToken};