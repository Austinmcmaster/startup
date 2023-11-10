const express = require('express');
const app = express();

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

apiRouter.get('/table', (_req,res) =>{
    res.send(entries);
});
apiRouter.post('/table', (req,res) =>{
    entries = updateTable(req.body, entries);
    res.send(entries);
});
apiRouter.post('/delete', (req,res) =>{
    entries.length = 0;
    res.send(entries);
});

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

let entries = []
function updateTable(newEntry, entries){
    entries.push(newEntry);
    return entries;
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

