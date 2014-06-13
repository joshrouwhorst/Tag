//setup canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.getElementById("game").appendChild(canvas); 

var then = Date.now();
var level = new Level();
var userInput = new UserInput();

var lx = 0, ly = 0;
var viewport = new Camera();

var graphics = new Graphics();
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
	userInput.init();
	viewport.init(canvas.width, canvas.height, level.LevelMap[0].length, level.LevelMap.length);
}

var update = function(){
	userInput.update();
	level.update();
	socket.emit("updatePlayers");
}

var draw = function(){
	viewport.setFocus(lx, ly);
	lx++;
	ly++;
	level.draw(ctx, viewport);
	var pList = getPlayersAsList();
	_.each(pList, function(player) {
		player.draw(ctx);
	});
}
}

//game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	update();
	draw();
	
	then = now;
};

