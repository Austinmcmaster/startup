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

apiRouter.get('/table', (_req,res) =>{
    res.send(entries);
});
apiRouter.post('/table', (req,res) =>{
    entries = updateTable(req.body, entries);
    res.send(entries);
});


app.use((_req, res) => {
    res.sendFile("index.html", {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let entries = []
function updateTable(newEntry, entries){
    entries.push(newEntry);
    return entries;
}

let times = []
function updateTimes(newTime, times){
    let found = false;
    for(const [i, prevTime] of times.entries()){
        if(newTime.time > prevTime.time){
            times.splice(i,0,newTime);
            found = true
            break;
        }
    }

    if(!found){
        times.push(newTime);
    }

    if(times.length > 10){
        times.length = 10;
    }

    return times;
}

