var level = require("./resources/level.js").Level;

function Player(id, socket, name) {
    var self = this;
    this.id = id;
    this.name = name || "Anonymous";
    this.radius = Math.floor(BOARD_SETTINGS.tileSize / 2);
    this.isTagged = false;
    this.tagTimer = 0;
    //this.x = Math.random() * BOARD_SETTINGS.maxX * BOARD_SETTINGS.tileSize;
    //this.y = Math.random() * BOARD_SETTINGS.maxY * BOARD_SETTINGS.tileSize;
    this.x = 35;
    this.y = 35;
    this.socket = socket;
    this.speed = 5;

   this.getSocketSafe = function() {
      return {
         id: self.id,
         name: self.name,
         isTagged: self.isTagged,
         tagTimer: self.tagTimer,
         x: self.x,
         y: self.y
      }
   }
   
    //Player trying to move up
    this.moveUp = function() {
        return this.movePlayerPosition(
                                        self.x, 
                                        self.y - self.speed, 
                                        self.x, 
                                        self.y - self.speed + self.radius);
   }
   
    //Player trying to move down
    this.moveDown = function() {
        return this.movePlayerPosition(
                                        self.x, 
                                        self.y + self.speed,
                                        self.x,
                                        self.y + self.speed + self.radius);
   }
   
    //player trying to move right
    this.moveRight = function() {
        return this.movePlayerPosition(
                                        self.x + self.speed,
                                        self.y,
                                        self.x + self.speed + self.radius,
                                        self.y);
   }
   
    //player trying to move left
    this.moveLeft = function() {
        return this.movePlayerPosition(
                                        self.x - self.speed,
                                        self.y,
                                        self.x - self.speed - self.radius,
                                        self.y);
    }

    //Calculate coordinate player is trying to move to
    this.movePlayerPosition = function (newX, newY, checkX, checkY) {
        var didPlayerMove = false;

        //Get tile (indecies in board/map array) for checkX, checkY pixel coordinates (factoring in radius of player)
        var xTileCoord = Math.floor(checkX / BOARD_SETTINGS.tileSize);
        var yTileCoord = Math.floor(checkY / BOARD_SETTINGS.tileSize);

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
