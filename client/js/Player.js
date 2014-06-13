// Players is basically a "static" class or a service.
var Players = (function(){
  var noop = function(){ return null; },
      players = {},
      currentPlayer,
      currentPlayerId;

  var init = function(){

  };

  var draw = function(ctx, camera){
	//var currentPlayer = getCurrentPlayer();
	for(var a = 0; a < Object.keys(players).length; a++){
    var x = Object.keys(players)[a];
		var i = players[x].getPosition().x;
		var j = players[x].getPosition().y;
		if(players[x].id == getCurrentPlayer().id){
			//draw ourselves
			if(players[x].getIsTagged()){
				ctx.drawImage(graphics.PlayerHolder.playerIt, camera.translateX(i), camera.translateY(j));
			}else{
				ctx.drawImage(graphics.PlayerHolder.playerNormal, camera.translateX(i), camera.translateY(j));
			}
		}else{
			if(players[x].getIsTagged()){
				ctx.drawImage(graphics.PlayerHolder.opponentIt, camera.translateX(i), camera.translateY(j));
			}else{
				ctx.drawImage(graphics.PlayerHolder.opponentNormal, camera.translateX(i), camera.translateY(j));
			}
		}
	}
  }

  var update = function( data ){
    var id;
    if (!data) {
      return null;
    }

    for ( id in data ) {
      if ( !players[id] ){
        players[id] = new Player( data[id] );
      }
    }

    for ( id in players ){
      if ( data[id] ){
        players[id].update( data[id] );
      } else {
        players[id] = null;
      }
    }

    setCurrentPlayer();
  };

  var getPlayers = function(){
    var playersIndex = [];

    for ( var id in players ){
      playersIndex.push( players[id] );
    }

    return playersIndex;
  };

  var getCurrentPlayer = function(){
    return currentPlayer;
  };

  var getPlayerById = function( id ){
    if ( players[id] ){
      return players[id];
    }

    return null;
  };

  var setCurrentPlayer = function() {
    if ( players[currentPlayerId] ){
      currentPlayer = players[currentPlayerId];
      return true;
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
    draw: draw,
    init: init
  };
})();

var Player = function( properties ){
  var that = this,
      noop = function(){ return null; };

  this.init = noop;
  this.draw = noop;

  this.update = function( _properties ) {
    var keys = Object.keys(_properties);
    _.each(keys, function(key) {
      properties[key] = _properties[key];
    });

    /*for (var attr in _properties){
      properties[attr] = _properties[attr];
    }*/
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
