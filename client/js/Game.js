//setup canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
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
    if (level.loaded) {
        if (viewport == null) {
            viewport = new Camera();
            viewport.init(canvas.width, canvas.height, self.LevelMap[0].length, self.LevelMap.length);
            var lx = 0, ly = 0;
        }
        viewport.setFocus(lx, ly);
        lx++;
        ly++;
        level.draw(ctx, viewport);
        for (var i = 0; i < players.length; i++) {
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