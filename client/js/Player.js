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
    var up = UserInput.is('up'),
        left = UserInput.is('left'),
        right = UserInput.is('right'),
        down = UserInput.is('down'),
        newX = that.x, newY = that.y;

    moveThisMuch = level.TileSize * that.speed;

    if ( up && left ){
      moveThisMuch = moveThisMuch / 2;
      newX = that.x + moveThisMuch;
      newY = that.y - moveThisMuch;
    } else if ( up && right ) {
      moveThisMuch = moveThisMuch / 2;
      newX = that.x - moveThisMuch;
      newY = that.y - moveThisMuch;
    } else if ( down && left ) {
      moveThisMuch = moveThisMuch / 2;
      newX = that.x + moveThisMuch;
      newY = that.y + moveThisMuch;
    } else if ( down && right ) {
      moveThisMuch = moveThisMuch / 2;
      newX = that.x - moveThisMuch;
      newY = that.y + moveThisMuch;
    } else if ( left ) {
      newX = that.x + moveThisMuch;
    } else if ( down ) {
      newY = that.y + moveThisMuch;
    } else if ( right ) {
      newX = that.x - moveThisMuch;
    } else if ( up ) {
      newY = that.y - moveThisMuch;
    }

    // TODO: Call level to check if there is anything at the new coords.

    that.x = Math.round(newX);
    that.y = Math.round(newY);

    // TODO: Send new coords to the server.
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
        speed: 1
      };

  for ( var attr in defaultValues ){
    if ( properties[attr] === undefined ){
      properties[attr] = defaultValues[attr];
    }
  }
};
