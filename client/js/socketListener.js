var socket = io.connect();

<<<<<<< HEAD
//server asked for my name
socket.on('whatsYoName', function() {
   var name = window.prompt("What's your name?", "");
   socket.emit('heresMyName', name);
});

//someone connected
socket.on('welcome', function(player) {
   alert(player.name + " has connected!");
});

//someone left
socket.on('left', function(name) {
   alert(name + " has left!");
});
=======
socket.on('serverResponse', function(data) {
   alert('Server said: ' + data);
});

socket.on('updatedPlayers', function(data){
  Players.update(data);
});
>>>>>>> a08acd35e54f56229bc486eced667e3488bfc62f
