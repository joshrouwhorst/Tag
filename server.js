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

//server client contents statically
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function(req, res) { res.sendfile(__dirname+'/client/game.html'); });


//GAME LOGIC
var players = {};

io.sockets.on('connection', function(socket) {
 var connection = this;
 var thisPlayer;

   //request a name
   socket.emit('whatsYoName');
   socket.on('heresMyName', function(name) {
     thisPlayer = new Player(socket.id, socket, name);
     thisPlayer.isTagged = !isSomeoneIt();
     players[socket.id] = thisPlayer;
     console.log(getPlayersAsList().length);
     socket.emit('heresYourPlayerId', thisPlayer.id);
     socketBroadcast('welcome', thisPlayer.getSocketSafe());
     socketBroadcast('heresTheLevel', level);
   });

   //remove from players list when disconnected
   socket.on('disconnect', function() {
    if(typeof players[socket.id] !== 'undefined') {
     socketBroadcast('left', players[socket.id].name, function() {
      delete players[socket.id];
    });
   }
 });

   //client user controls
   socket.on('goUp', function() {
     if (!players[socket.id].moveUp())
       socket.emit('collisionDetected');
   });

   socket.on('goDown', function() {
     if (!players[socket.id].moveDown())
       socket.emit('collisionDetected');
   });

   socket.on('goLeft', function() {
     if(!players[socket.id].moveLeft())
       socket.emit('collisionDetected');
   });

   socket.on('goRight', function () {
     if(!players[socket.id].moveRight())
       socket.emit('collisionDetected');
   });

   socket.on('tryTag', function() {
      //Make sure player is actually tagged (it) and it's tag timer is 0
      if(players[socket.id].isTagged && players[socket.id].tagTimer <= 0){
       var pList = getPlayersAsList();
       var aLeg = 0;
       var bLeg = 0;
       var cLeg = 0;

         //loop through the list
         _.each(pList, function(player){
            //Make sure the player is not itself
            if (socket.id != player.id){
               //Trig! - find Hypotenuse (distance)
               aleg = player.x - players[socket.id].x;
               bLeg = player.y - players[socket.id].y;
               cLeg = Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg, 2));

               //check distance (<= than player radius)
               if (cLeg <= players[socket.id].radius){
                  //Current player no longer it
                  players[socket.id].isTagged = false;

                  //Target player is now it!
                  players[player.id].isTagged = true;

                  socket.emit('someoneWasTagged', player.id)
                }
              }
            });
       }
     });

var isSomeoneIt = function () {
 var pList = getPlayersAsList();
 var someoneIsIt = false;
       //loop through the list
       _.each(pList, function (player) {
         if (player.isTagged)
           someoneIsIt = true;
       });

       return someoneIsIt;
     }
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

function getPlayersSocketSafe() {
 var playerKeys = Object.keys(players);
 var playersSocketSafe = {};
 _.each(playerKeys, function(key) {
  playersSocketSafe[key] = players[key].getSocketSafe();
});
 return playersSocketSafe;
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

setInterval(function() {
  socketBroadcast('updatedPlayers', getPlayersSocketSafe());
}, 10);