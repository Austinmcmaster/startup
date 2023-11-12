const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/times', async (_req,res) => {
    const leaderboard = await DB.getLeaderboard();
    res.send(leaderboard)
});

apiRouter.post('/times', async (req,res) => {
    await DB.updateLeaderboard(req.body);
    const leaderboard = await DB.getLeaderboard();
    res.send(leaderboard);

})

// Entry Table Endpoints 
apiRouter.get('/table/:id', async (_req,res) =>{
    const table = await DB.getEntries(_req.params.id);
    res.send(table);
});

apiRouter.post('/table', async (req,res) =>{
    await DB.addEntry(req.body);
    const table = await DB.getEntries(req.body.UserID);
    res.send(table);
});

apiRouter.delete('/table/:id', async (req,res) =>{
    await DB.deleteEntries(req.params.id);
    var data = await DB.getEntries(req.params.id)
    res.send(data);
});

// User Table Endpoints
apiRouter.get('/user', async (req,res) => {
    const user = await DB.getUser(req.body);
    res.send(user);
});

apiRouter.post('/user', async (req,res) => {
    const user = await DB.addUser(req.body);
    res.send(user);
})


app.use((_req, res) => {
    res.sendFile("index.html", {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

