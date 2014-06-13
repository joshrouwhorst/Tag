function Player(id, name) {
  this.id = id;
  this.name = name;
  this.x = 10;
  this.y = 10;

  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.draw = function(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x * level.TileSize, this.y * level.TileSize , level.TileSize, level.TileSize);  
  }
}