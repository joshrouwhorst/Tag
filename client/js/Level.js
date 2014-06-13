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

	this.update = function(){
	}
	this.drawLevel = function(ctx, camera){
		if(this.LevelMap != undefined){
			for(var x = 0; x < this.LevelMap.length - 1; x++){
				for(var y = 0; y < this.LevelMap[x].length - 1; y++){
					if(this.LevelMap[x][y] == "w"){
					    ctx.fillStyle = "black";
						ctx.fillRect(camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize), this.TileSize, this.TileSize);
					}else{
						ctx.fillStyle = "green";
						ctx.fillRect(camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize), this.TileSize, this.TileSize);
					}
					//ctx.fillRect(x * this.TileSize, y * this.TileSize , this.TileSize, this.TileSize);
				}			
			}
		}
	}

	this.drawPlayers = function(ctx, camera) {
		for(var x = 0; x <= this.TileX; x++){
			for(var y = 0; y <= this.TileY; y++){
				if(this.LevelMap[x][y] instanceof Player){ //Made Player a global class
					ctx.fillStyle = this.LevelMap[x][y].Color;
					ctx.fillRect(camera.translateX(x * this.TileSize), camera.translateY(y * this.TileSize), this.TileSize, this.TileSize);
				}
			}
		}
	}

	this.draw = function(ctx, camera){
		this.drawLevel(ctx, camera);
	}
}
