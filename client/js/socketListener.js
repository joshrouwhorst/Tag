var socket = io.connect();

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