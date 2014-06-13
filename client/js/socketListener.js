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
  Players.update(data);
});

socket.on("heresTheLevel", function (data) {
  level.init(data);
  init();
    setInterval(main, (1000 / 60)); //60 FPS
  });
