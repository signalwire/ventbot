require('dotenv').config();
let server = require('http').createServer();
let app = require('./lib/web');

server.on('request', app);

server.listen(process.env.PORT || 5000, function() {
  console.log("http/ws server listening");
});
