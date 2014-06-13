// Players is basically a "static" class or a service.
var Players = (function(){
  var noop = function(){ return null; },
      players = [],
      currentPlayer;

  var init = function(){
    socket.emit('updatePlayers');
  };

  var update = function(data){
    //Find out what the user's pushing
    if (!data) {
      return null;
    }

    // Clears out the array but keeps all references to the array sync'd.
    players.splice( 0, players.length );

    for ( var i = 0; i < data.length; i++ ){
      players.push( new Player( data[i] ) );
      //Find logged in player and keep track of them.

      if ( data[i].isUser ){
        currentPlayer = players[ players.length - 1 ];
      }
    }
  };

  this.draw = noop;

  var getPlayers = function(){
    return players;
  };

  return {
    getPlayers: getPlayers,
    update: update,
    draw: noop,
    init: init
  };
})();

var Player = function( properties ){
  var that = this,
      noop = function(){ return null; };

  this.init = noop;
  this.draw = noop;

  this.update = function(){
    // Find out if there's a wall or powerup or another player

    if ( that.isUser() ) {
      var up = UserInput.is('up'),
          left = UserInput.is('left'),
          right = UserInput.is('right'),
          down = UserInput.is('down');

      if ( up && left ){
        angle = 45;
      } else if ( up && right ) {
        angle = 315;
      } else if ( down && left ) {
        angle = 135;
      } else if ( down && right ) {
        angle = 225;
      } else if ( left ) {
        angle = 90;
      } else if ( down ) {
        angle = 180;
      } else if ( right ) {
        angle = 270;
      } else {
        angle = 0;
      }
    }
  };

  this.isUser = function(){
    return that === currentPlayer;
  };

  this.getPosition = function(){
    return {
      x: properties.x,
      y: properties.y
    };
  };

  this.getColor = function(){
    return properties.color;
  };

  this.getIsTagged = function(){
    return properties.isTagged;
  };

  var x = properties.x,
      y = properties.y,
      defaultValues = {
        color: 'red',
        x: 0,
        y: 0,
        isTagged: false,
        velocity: 1
      };

  for ( var attr in defaultValues ){
    if ( properties[attr] === undefined ){
      properties[attr] = defaultValues[attr];
    }
  }
};
