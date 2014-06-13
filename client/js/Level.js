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
		for(var x = 0; x <= self.LevelMap.length - 1; x++){
			for(var y = 0; y <= self.LevelMap[x].length - 1; y++){
				if(self.LevelMap[x][y] == "w"){
					ctx.fillStyle = "black";
				}else{
					ctx.fillStyle = "gray";
				}
				ctx.fillRect(x * self.TileSize, y * self.TileSize , self.TileSize, self.TileSize);
			}
		}
	}
	
	this.draw = function(ctx){
		self.drawLevel(ctx);
	}
}