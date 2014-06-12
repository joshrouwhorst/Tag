var Players = function(){
  var noop = function(){ return null; },
      players = this;

  this.init = function(){
    socket.emit('updatePlayers');
  };

  this.update = function(data){
    //Find out what the user's pushing
    if (!data) {
      return null;
    }

    var players = [],
        currentPlayer;

    for ( var i = 0; i < data.length; i++ ){
      players.push( new players.Player( data[i] ) );
      //Find logged in player and keep track of them.

      if ( playerData[i].isUser ){
        currentPlayer = players[ players.length - 1 ];
      }
    }
  };

  this.draw = noop;

  this.getPlayers = function(){
    return players;
  };

  this.Player = function( properties ){
    var that = this;

    this.init = noop;
    this.draw = noop;

    this.update = function(){
      // Find out if there's a wall or powerup or another player

      if ( that.isUser() ) {
        var up = UserInput.isPressingUp(),
            left = UserInput.isPressingLeft(),
            right = UserInput.isPressingRight(),
            down = UserInput.isPressingDown();

        if ( up && left ){

        }
      }
    };

    this.isUser = function(){
      return that === currentPlayer;
    };

    this.getPosition = function(){
      return properties.position;
    };

    this.getColor = function(){
      return properties.color;
    };

    this.getIsTagged = function(){
      return properties.isTagged;
    };

    var defaultValues = {
      color: 'red',
      position: {
        x: 0,
        y: 0
      },
      isTagged: false
    };

    for ( var attr in defaultValues ){
      if ( properties[attr] === undefined ){
        properties[attr] = defaultValues[attr];
      }
    }
  };
};
