var express = require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');

//import game logic
var Player = require('./server/GameState.js').Player;

//start server
server.listen(process.env.PORT || 3000);

var players = {};

io.sockets.on('connection', function(socket) {
   var connection = this;
   var thisPlayer;

   //request a name
   //socket.emit('whatsYoName');
   socket.on('heresMyName', function(name) {
      thisPlayer = new Player(socket.id, socket, name);
      players[socket.id] = thisPlayer;
      socketBroadcast('welcome', thisPlayer.getSocketSafe());
   });

   //client asked for player information
   socket.on('updatePlayers', function() {
      socket.emit('updatedPlayers', getPlayersAsList());
   });

   //remove from players list when disconnected
   socket.on('disconnect', function() {
      socket_broadcast('left', players[socket.id].name);
      delete players[socket.id];
   });

   //client sent some updated player information
   socket.on('updatedPlayer', function(data) {
      //update X and Y
   });
});

function socketBroadcast(emit_key, message) {
   var playerKeys = Object.keys(players);
   _.each(playerKeys, function(key) {
      var player = players[key];
      player.socket.emit(emit_key, message);
   });
}

function getPlayersAsList() {
   var playerKeys = Object.keys(players);
   var players = [];
   _.each(playerKeys, function(key) {
      var player = players[key];
      players.add(player);
   });

   return players;
}

//server client contents statically
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function(req, res) { res.sendfile(__dirname+'/client/game.html'); });