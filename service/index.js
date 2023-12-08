const express = require('express');
const app = express();
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { WebSocketServer } = require('ws');



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
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.addUser(req.body.email, req.body.password, req.body.username);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        username: user.username,
        id: user._id,
      });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    console.log(req.body);
    console.log(user);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ username: user.username, id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
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



secureApiRouter.get('/times', async (_req,res) => {
    const leaderboard = await DB.getLeaderboard();
    res.send(leaderboard)
});

secureApiRouter.post('/times', async (req,res) => {
    await DB.updateLeaderboard(req.body);
    const leaderboard = await DB.getLeaderboard();
    res.send(leaderboard);

})

// Entry Table Endpoints 
secureApiRouter.get('/table/:id', async (_req,res) =>{
    const table = await DB.getEntries(_req.params.id);
    res.send(table);
});

secureApiRouter.post('/table', async (req,res) =>{
    await DB.addEntry(req.body);
    const table = await DB.getEntries(req.body.id);
    res.send(table);
});

secureApiRouter.delete('/table/:id', async (req,res) =>{
    await DB.deleteEntries(req.params.id);
    var data = await DB.getEntries(req.params.id)
    res.send(data);
});


// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile("login.html", {root: 'public'});
});



const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// Web Socket 
const wss = new WebSocketServer({noServer: true});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request,socket,head, function done(ws){
    wss.emit('connection',ws,request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);
  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);




