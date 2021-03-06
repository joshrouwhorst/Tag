//setup canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 576;
document.getElementById("game").appendChild(canvas); 

var then = Date.now();
var level = new Level();
var userInput = new UserInput();

var lx = 0, ly = 0;
var viewport = new Camera();

var graphics = new Graphics();
var sounds = new Sounds();
var myPlayerId = -1;
var players = {};

function getPlayersAsList() {
	var playerKeys = Object.keys(players);
	var pList = [];
	_.each(playerKeys, function(key) {
		var player = players[key];
		pList.push(player.getSocketSafe());
	});
	return pList;
}

function getMyPlayer() {
	return players[myPlayerId];
}

var init = function(){
	graphics.init();
	sounds.init();
	userInput.init();
	viewport.init(canvas.width, canvas.height, level.LevelMap[0].length * level.TileSize, level.LevelMap.length * level.TileSize);
}

var update = function(){
	userInput.update();
	level.update();
}

var draw = function () {

    //Set focus 
    var player = Players.getCurrentPlayer();
	if(player == undefined){
		return;
	}
    viewport.setFocus(player.getPosition().x, player.getPosition().y);
	
	//if (sounds.MusicPlayer.gameNormalMusicLoaded && !sounds.MusicPlayer.isNormalBackgroundPlaying())
    //    sounds.MusicPlayer.playNormalBackground();
		
	level.draw(ctx, viewport);
	Players.draw(ctx, viewport);
}

//game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update();
	draw();

	then = now;
};
