var socket = io.connect();

socket.on('serverResponse', function(data) {
   alert('Server said: ' + data);
});