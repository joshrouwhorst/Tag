var Level = function(){
	self = this;
	this.LevelMap = [];
	this.PlayerMap = [];
	this.TileSize = 32;
	this.loaded = false;

	this.init = function(map) {
		self.LevelMap = map;
		self.loaded = true;
	}	
	
	/*this.placePlayers = function(){
		for(var i = 0; i <= players.length; i++){
			var coord = players[i].getPosition();
			this.PlayerMap[coord.x][coord.y] = player;
		}
	}*/
	
	this.update = function(){
		//this.placePlayers();
	}
	
	this.drawLevel = function(ctx){
		if(this.LevelMap != undefined){
			for(var x = 0; x < this.LevelMap.length; x++){
				for(var y = 0; y < this.LevelMap[x].length; y++){
					if(this.LevelMap[x][y] == "w"){
						ctx.drawImage(graphics.TextureHolder.wall, x * this.TileSize, y * this.TileSize);
					}else{
						ctx.drawImage(graphics.TextureHolder.grass, x * this.TileSize, y * this.TileSize);
					}
					//ctx.fillRect(x * this.TileSize, y * this.TileSize , this.TileSize, this.TileSize);
				}			
			}
		}
	}
	
	this.drawPlayers = function(ctx){
		for(var x = 0; x <= this.TileX; x++){
			for(var y = 0; y <= this.TileY; y++){
				if(this.LevelMap[x][y] instanceof players.Player){
					ctx.fillStyle = this.LevelMap[x][y].Color;
					ctx.fillRect(x * this.TileSize, y * this.TileSize , this.TileSize, this.TileSize);
				}				
			}			
		}
	}
	
	this.draw = function(ctx){
		self.drawLevel(ctx);
	}
}