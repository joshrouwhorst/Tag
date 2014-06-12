var socket = io.connect();

socket.on('serverResponse', function(data) {
   alert('Server said: ' + data);
});

socket.on('updatedPlayers', function(data){
  Players.update(data);
});
