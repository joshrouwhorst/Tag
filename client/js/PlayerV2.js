function Player(id, name) {
  this.id = id;
  this.isClient = socket.id === id;
  this.name = name;
  this.x = 0;
  this.y = 0;

  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.draw = function(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x * level.TileSize, this.y * level.TileSize , level.TileSize, level.TileSize);  
  }
}