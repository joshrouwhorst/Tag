function Player(id, socket, name) {
   var self = this;
   this.id = id;
   this.name = name || "Anonymous";
   this.x = Math.random() * BOARD_SETTINGS.maxX;
   this.y = Math.random() * BOARD_SETTINGS.maxY;
   this.socket = socket;

   this.getSocketSafe = function() {
      return {
         id: self.id,
         name: self.name,
         x: self.x,
         y: self.y
      }
   }
}

var BOARD_SETTINGS = {
   maxX: 250,
   maxY: 250
}

module.exports = {
   Player: Player
};