var addOneToMe = function() {
   var number = document.getElementById('number').value;
   socket.emit('addOneToMe', number);
}