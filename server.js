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
      socketBroadcast('left', players[socket.id].name, function() {
         delete players[socket.id];
      });
   });

   //client user controls
   socket.on('goUp', function() {
      players[socket.id].moveUp();
   });

   socket.on('goDown', function() {
      players[socket.id].moveDown();
   });

   socket.on('goLeft', function() {
      players[socket.id].moveLeft();
   });

   socket.on('goRight', function() {
      players[socket.id].moveRight();
      console.log(players[socket.id].getSocketSafe());
   });

   socket.on('tryTag', function() {
      //Make sure player is actually tagged (it) and it's tag timer is 0
      if(socket.isTagged && socket.tagTimer <= 0){
         var pList = getPlayersAsList();
         var aLeg = 0;
         var bLeg = 0;
         var cLeg = 0;

         //loop through the list
         _each(pList, function(player){
            //Make sure the player is not itself
            if (socket.id != player.id){
               //Trig! - find Hypotenuse (distance)
               aleg = player.x - socket.x;
               bLeg = player.y - socket.y;
               cLeg = Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg, 2));

               //check distance (<= than player radius)
               if (cLeg <= socket.radius){
                  //Current player no longer it
                  socket.isTagged = false;

                  //Target player is now it!
                  player.isTagged = true;
               }
            }
         });
      }
   });
});

function socketBroadcast(emitKey, message, callback) {
   var playerKeys = Object.keys(players);
   _.each(playerKeys, function(key) {
      var player = players[key];
      player.socket.emit(emitKey, message);
   });

   if(callback) {
      callback();
   }
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