var level = require("./resources/level.js").Level;

function Player(id, socket, name) {
    var self = this;
    this.id = id;
    this.name = name || "Anonymous";
    this.x = 60;
    this.y = 60;
    this.socket = socket;
    this.speed = 15;

   this.getSocketSafe = function() {
      return {
         id: self.id,
         name: self.name,
         x: self.x,
         y: self.y
      }
   }
   
    //Player trying to move up
    this.moveUp = function() {
        return this.movePlayerPosition(self.x, self.y + self.speed);
   }
   
    //Player trying to move down
    this.moveDown = function() {
        return this.movePlayerPosition(self.x, self.y - self.speed);
   }
   
    //player trying to move right
    this.moveRight = function() {
        return this.movePlayerPosition(self.x + self.speed, self.y);
   }
   
    //player trying to move left
    this.moveLeft = function() {
        return this.movePlayerPosition(self.x - self.speed, self.y);
    }

    //player trying to tag
    this.pressedTag = function () {
        //figure out if player is touching another player
        return false;
    }

    //Calculate coordinate player is trying to move to
    this.movePlayerPosition = function (newX, newY) {
        var didPlayerMove = false;

        //Get tile (indecies in board/map array) for newX, newY pixel coordinates
        var xTileCoord = Math.floor(newX / BOARD_SETTINGS.tileSize);
        var yTileCoord = Math.floor(newY / BOARD_SETTINGS.tileSize);

        //Make sure if no wall is at the specified tile
        var tileOnMap = level[xTileCoord][yTileCoord];

        // 'n' = no wall
        // 'w' = wall
        if(tileOnMap == 'n'){
            //actually update player position
            self.x = newX;
            self.y = newY;

            //allow client to move
            didPlayerMove = true;
        }

        //return movement result
        return didPlayerMove;
    }
}

// 250 tiles
var BOARD_SETTINGS = {
    maxX: 250,
    maxY: 250,
    tileSize: 32
}

module.exports = {
   Player: Player
};
