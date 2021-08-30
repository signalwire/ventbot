require('dotenv').config();
let server = require('http').createServer();
let app = require('./lib/web');
let bayeux = require('./lib/bayeux');


server.on('request', app);
bayeux.attach(server)

server.listen(process.env.PORT || 5000, function() {
  console.log("http/ws server listening");
});
