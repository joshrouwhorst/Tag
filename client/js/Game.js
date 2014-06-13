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
var players = [];

var init = function(){
	graphics.init();
	userInput.init();
	viewport.init(canvas.width, canvas.height, level.LevelMap[0].length * level.TileSize, level.LevelMap.length * level.TileSize);
}

var update = function(){
	userInput.update();
	level.update();
	socket.emit("updatePlayers");
}

var draw = function(){
    viewport.setFocus(lx, ly);
    //lx = lx+25;
    ly = ly+25;
    level.draw(ctx, viewport);
    for (var i = 0; i < players.length; i++) {
        players[i].draw(ctx);
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

