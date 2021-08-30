let express = require('express');
let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const utility = require('./utility');
const { uuid } = require('uuidv4');

app.get('/', async (req, res) => {
  var sipApp = process.env.SIP_APP
  var defaultDestination = process.env.DEFAULT_DESTINATION
  var projectId = process.env.SIGNALWIRE_PROJECT_KEY
  var token = await utility.apiRequest('/api/relay/rest/jwt', { expires_in: 120 }) 
  res.render('index', { sipApp, defaultDestination, projectId, token: token.jwt_token, uuid: uuid() });
})

app.post('/updates', async (req, res) => {
  console.log(req.body)
  bayeux.getClient().publish('/updates/' + req.body.uuid, req.body.msg);
  res.send('ok');
});

module.exports = app;