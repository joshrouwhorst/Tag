//server asked for my name
socket.on('whatsYoName', function() {
   //var name = window.prompt("What's your name?", "");
   socket.emit('heresMyName', "");
});

//heres your player id
socket.on('heresYourPlayerId', function(id) {
debugger;
  Players.setCurrentPlayerId( id );
});

//someone connected
socket.on('welcome', function(player) {
 console.log(player.name + " has connected!");
});

//someone left
socket.on('left', function(name) {
 console.log(name + " has left!");
});

//server sent players
socket.on('updatedPlayers', function(data){
  console.log(data[0].x + ", " + data[0].y)
  Players.update(data);
});

socket.on("heresTheLevel", function (data) {
  level.init(data);
  init();
    setInterval(main, (1000 / 60)); //60 FPS
});

socket.on("someoneWasTagged", function (playerId) {
    if (Players.getCurrentPlayer().id == playerId)
        sounds.FXPlayer.playTaggedPlayer();
    else
        sounds.FXPlayer.playTaggedOpponent();
});

socket.on("collisionDetected", function () {
    sounds.FXPlayer.playCollision();
});
