const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/times', (_req,res) => {
    res.send(times);
});

apiRouter.post('/times', (req,res) => {
    times = updateTimes(req.body, times);
    res.send(times);
})
apiRouter.post('/times/delete',(req,res) =>{
    times.length = 0;
    res.send(times);
});



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
apiRouter.get('/user', (_req,res) => {
    res.send(users);
});

apiRouter.post('/user', (req,res) => {
    users = updateUsers(req.body, users);
    res.send(users);
})


app.use((_req, res) => {
    res.sendFile("index.html", {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let users = []
function updateUsers(newUser, users){
    users.push(newUser);
    return users;
}

let times = []
function updateTimes(newTime, times){
    let found = false;
    let update = false
    let updateindex = -1;
    for(const [i, prevTime] of times.entries()){
        if(newTime.entryID === prevTime.entryID){
            found = true
            break;
        }
        if(newTime.USERID === prevTime.USERID){
            if(newTime.Time > prevTime.Time){
                update = true;
                updateindex = i;
                break;
            }
        }

    }
    if(update){
        times.splice(updateindex,1);
    }

    if(!found){
        times.push(newTime);
    }

    if(times.length > 10){
        times.length = 10;
    }

    return times;
}

