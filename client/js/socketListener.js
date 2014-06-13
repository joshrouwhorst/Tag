//server asked for my name
socket.on('whatsYoName', function() {
   //var name = window.prompt("What's your name?", "");
   socket.emit('heresMyName', "");
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
  for(var i = 0; i < players.length; i++) {
    players[i].update(data.x, data.y);
  }
});

socket.on("heresTheLevel", function (data) {
    level.init(data);
    init();
    setInterval(main, (1000 / 60)); //60 FPS
});
