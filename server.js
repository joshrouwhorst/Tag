var express = require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);
var bobby = "stuff";

//start server
server.listen(process.env.PORT || 3000);

io.sockets.on('connection', function(socket) {
   var connection = this;
   socket.on('addOneToMe', function(number) {
      socket.emit('serverResponse', number*1 + 1);
   });
});

//server client contents statically
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function(req, res) { res.sendfile(__dirname+'/client/game.html'); });