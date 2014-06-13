//setup canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 700;
document.getElementById("game").appendChild(canvas); 


var then = Date.now();
var level = new Level();
var graphics = new Graphics();
//var players = new Players();
var players = [];

var init = function(){
	//players.init();
	graphics.init();
}

var update = function(){
	level.update();
	socket.emit("updatePlayers"); //update players ie: players.update()
}

var draw = function(){
	if(level.loaded)
		level.draw(ctx);
	for(var i = 0; i < players.length; i++) {
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

init();
setInterval(main, (1000 / 60)); //60 FPS