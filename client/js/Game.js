//setup canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 700;
document.getElementById("game").appendChild(canvas); 


var then = Date.now();
var level = new Level();
var userInput = new UserInput();

var graphics = new Graphics();
var players = [];

var init = function(){
	graphics.init();
	userInput.init();
}

var update = function(){
	userInput.update();
	level.update();
	socket.emit("updatePlayers");
}

var draw = function(){
	//don't draw anything until the level is loaded from the server
	if(level.loaded) {
		level.draw(ctx);
		
		for(var i = 0; i < players.length; i++) {
			players[i].draw(ctx);
		}
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

init();
setInterval(main, (1000 / 60)); //60 FPS