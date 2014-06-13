var express = require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');

//import game logic
var Player = require('./server/GameState.js').Player;
var level = require("./server/resources/level.js").Level;

//start server
var port = process.env.PORT || 3000;
server.listen(port);
console.log('==============================');
console.log('Server started on port ' + port + '...');
console.log('==============================');

var players = {};

io.sockets.on('connection', function(socket) {
   var connection = this;
   var thisPlayer;

   //request a name
   socket.emit('whatsYoName');
   socket.on('heresMyName', function(name) {
      thisPlayer = new Player(socket.id, socket, name);
      players[socket.id] = thisPlayer;
      socket.emit('heresYourPlayerId', thisPlayer.id);
      socketBroadcast('welcome', thisPlayer.getSocketSafe());
      socketBroadcast('heresTheLevel', level);
   });

   //client asked for player information
   socket.on('updatePlayers', function() {
      socket.emit('updatedPlayers', getPlayersAsList());
   });

   //remove from players list when disconnected
   socket.on('disconnect', function() {
      var playerLeft = players[socket.id];
      socketBroadcast('left', playerLeft.name);
      delete players[socket.id];
   });

   //client sent some updated player information
   socket.on('updatedPlayer', function(data) {
      players[socket.id].update(data.x, data.y);
   });
});

function socketBroadcast(emitKey, message) {
   var playerKeys = Object.keys(players);
   _.each(playerKeys, function(key) {
      var player = players[key];
      player.socket.emit(emitKey, message);
   });
}

function getPlayersAsList() {
   var playerKeys = Object.keys(players);
   var pList = [];
   _.each(playerKeys, function(key) {
      var player = players[key];
      pList.push(player.getSocketSafe());
   });

   return pList;
}

//server client contents statically
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function(req, res) { res.sendfile(__dirname+'/client/game.html'); });