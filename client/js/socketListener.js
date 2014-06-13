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

socket.on('updatedPlayers', function(data){
  players = data;
});

socket.on('updatedPlayers', function(data){
  Players.update(data);
});

socket.on("heresTheLevel", function(data){
  level.init(data);
});
