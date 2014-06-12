var express = require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);

//start server
server.listen(process.env.PORT || 3000);

io.sockets.on('connection', function(client) {
   var connection = this;

   client.on('addOneToMe', function(number) {
      client.emit('serverResponse', number*1 + 1);
   });
});

//server client contents statically
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function(req, res) { res.sendfile(__dirname+'/client/game.html'); });