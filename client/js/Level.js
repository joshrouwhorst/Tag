var Level = function(){
	this.LevelMap = new Array();
	this.PlayerMap = new Array();
	this.TileSize = 32;
	
	this.init = function(map) {
		this.LevelMap = map;
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
		for(var x = 0; x <= this.TileX; x++){
			for(var y = 0; y <= this.TileY; y++){
				if(this.LevelMap[x][y] == "w"){
					ctx.fillStyle = "black";
				}else{
					ctx.fillStyle = "gray";
				}
				ctx.fillRect(x * this.TileSize, y * this.TileSize , this.TileSize, this.TileSize);
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
		this.drawLevel(ctx);
		this.drawPlayers(ctx);
	}
}