// Players is basically a "static" class or a service.
var Players = (function(){
  var noop = function(){ return null; },
      players = [],
      currentPlayer;

  var init = function(){
    socket.emit('updatePlayers');
  };

  var update = function(data){
    var found;

    //Find out what the user's pushing
    if (!data) {
      return null;
    }

    for ( var i = 0; i < players.length; i++ ){
      found = false;

      for ( var j = 0; j < data.length && !found; j++ ){
        if ( players[i].id === data[j].id ){
          players[i].update( data[j] );
          found = true;
        }
      }

      if ( !found ){
        players.splice(i, 1);
        i--;
      }
    }
  };

  var getPlayers = function(){
    return players;
  };

  var getCurrentPlayer = function(){
    return currentPlayer;
  };

  var getPlayerById = function( id ){
    for ( var i = 0; i < players.length; i++ ){
      if ( players[i].id == id ){
        return players[i];
      }
    }

    return null;
  };

  return {
    getPlayerById: getPlayerById,
    getCurrentPlayer: getCurrentPlayer,
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

  this.update = function( _properties ){
    for (var attr in _properties){
      properties[attr] = _properties[attr];
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
        speed: 1
      };

  if ( properties.id ) {
    this.id = properties.id;
  }

  for ( var attr in defaultValues ){
    if ( properties[attr] === undefined ){
      properties[attr] = defaultValues[attr];
    }
  }
};
