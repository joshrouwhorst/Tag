// Players is basically a "static" class or a service.
var Players = (function(){
  var noop = function(){ return null; },
      players = [],
      currentPlayer,
      currentPlayerId;

  var init = function(){
    
  };
  
  var draw = function(ctx, camera){
	var currentPlayer = getCurrentPlayer();
	for(var x = 0; x <= players.length; x++){
		if(players[x].id == currentPlayer.id){
			//draw ourselves
			if(players[x].getIsTagged()){
				ctx.drawImage(graphics.PlayerHolder.playerIt, camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize));
			}else{
				ctx.drawImage(graphics.PlayerHolder.playerNormal, camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize));
			}
		}else{
			if(players[x].getIsTagged()){
				ctx.drawImage(graphics.PlayerHolder.opponentIt, camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize));
			}else{
				ctx.drawImage(graphics.PlayerHolder.opponentNormal, camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize));
			}
		}
	}
  }

  var update = function( data ){
    var found;

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

    setCurrentPlayer();
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

  var setCurrentPlayer = function() {
    for ( var i = 0; i < players.length; i++ ){
      if ( !currentPlayer && players[i].id === currentPlayerId){
        currentPlayer = players[i];
        return true;
      }
    }

    return false;
  };

  var setCurrentPlayerId = function( id ){
    currentPlayerId = id;
    setCurrentPlayer();
  };

  return {
    setCurrentPlayerId: setCurrentPlayerId,
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
