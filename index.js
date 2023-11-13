const express = require('express');
const app = express();
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');



const authCookieName = 'token';
// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use('/api', apiRouter);


// User Table Endpoints

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});



var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});



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



app.use((_req, res) => {
    res.sendFile("login.html", {root: 'public'});
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

