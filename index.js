require('dotenv').config();
let express = require('express');
let app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const utility = require('./lib/utility');
const { uuid } = require('uuidv4');

app.get('/', async (req, res) => {
  var sipApp = process.env.SIP_APP
  var defaultDestination = process.env.DEFAULT_DESTINATION
  var projectId = process.env.SIGNALWIRE_PROJECT_KEY
  var token = await utility.apiRequest('/api/relay/rest/jwt', { expires_in: 120 }) 
  res.render('index', { sipApp, defaultDestination, projectId, token: token.jwt_token, uuid: uuid() });
})

app.post('/updates', async (req, res) => {
  console.log("got update", req.body.uuid, req.body.msg)
  io.in(req.body.uuid).emit('update', req.body.msg);
  res.send('ok');
});

io.on('connection', (socket) => {
  console.log('client connected', socket.handshake.auth.uuid)
  socket.join(socket.handshake.auth.uuid);
});

server.listen(process.env.PORT || 5000, function() {
  console.log("http/ws server listening");
});