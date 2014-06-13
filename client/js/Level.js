var Level = function(){
	this.LevelMap = new Array();
	this.PlayerMap = new Array();
	this.TileX = 250;
	this.TileY = 250;
	this.TileSize = 32;
	
	//w = wall
	//b = blank
	this.createLevel = function(){
		for(var x = 0; x <= this.TileX; x++){
			var ArrayToAdd = new Array();
			for(var y = 0; y <= this.TileY; y++){
				if(x == 0 || y == 0 || x == this.TileX || y == this.TileY){
					ArrayToAdd.push('w');
				}else{
					ArrayToAdd.push('n');
				}
			}
			this.LevelMap.push(ArrayToAdd);
		}
	}
	
	
	this.init = function(){
		this.createLevel();
		//socket.on("initiatedLevel", function(data){
			//this.LevelMap = data;
		//});
	}	
	
	this.placePlayers = function(){
		for(var i = 0; i <= players.length; i++){
			var coord = players[i].getPosition();
			this.PlayerMap[coord.x][coord.y] = player;
		}
	}
	
	this.update = function(){
		this.placePlayers();
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