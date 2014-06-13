var Graphics = function () {
    
    //===========================================
    //Texture
	this.TextureHolder;
    var Texture = function () {
        var base_dir = "../client/graphics/texture/";
        
        //Grass block
        this.grassReady = false;
        this.grass = new Image();
        this.grass.onload = function () {
            grassReady = true;
        };
        this.grass.src = base_dir + "grass.png";

        //Overgrown grass block
        this.grassOvergrownReady = false;
        this.grassOvergrown = new Image();
        this.grassOvergrown.onload = function () {
            grassOvergrownReady = true;
        };
        this.grassOvergrown.src = base_dir + "overgrown.png";

        //Boundary
        this.boundaryWallReady = false;
        this.boundaryWall = new Image();
        this.boundaryWall.onload = function () {
            boundaryWallReady = true;
        };
        this.boundaryWall.src = base_dir + "wall-dark.png";

        //Walls
        this.wallReady = false;
        this.wall = new Image();
        this.wall.onload = function () {
            wallReady = true;
        };
        this.wall.src = base_dir + "wall-light.png";

        this.init = function () {

        }

        this.isLoaded = function () {
            return grassReady && grassOvergrownReady && boundaryWallReady && wallReady;
        }
    }

    //===========================================
    //Powerups
	this.PowerupHolder;
    var Powerup = function () {
        var base_dir = "../client/graphics/powerup/";

        this.init = function () {

        }

        this.isLoaded = function () {
            return true;
        }
    }

    //===========================================
    //Player
	this.PlayerHolder
    var Player = function () {
        var base_dir = "../client/graphics/player/";

        //Player normal
        var playerNormalReady = false;
        var playerNormal = new Image();
        playerNormal.onload = function () {
            playerNormalReady = true;
        };
        playerNormal.src = base_dir + "player-normal.png";

        //Player "it"
        var playerItReady = false;
        var playerIt = new Image();
        playerIt.onload = function () {
            playerItReady = true;
        };
        playerIt.src = base_dir + "player-it.png";

        //Opponent normal
        var opponentNormalReady = false;
        var opponentNormal = new Image();
        opponentNormal.onload = function () {
            opponentNormalReady = true;
        };
        opponentNormal.src = base_dir + "opponent-normal.png";

        //Opponent "it"
        var opponentItReady = false;
        var opponentIt = new Image();
        opponentIt.onload = function () {
            opponentItReady = true;
        };
        opponentIt.src = base_dir + "opponent-it.png";

        this.init = function () {

        }

        this.isLoaded = function () {
            return playerNormalReady && playerItReady && opponentNormalReady && opponentItReady;
        }
    }

    this.init = function () {
        this.TextureHolder = new Texture();
		this.TextureHolder.init();
		
        this.PowerupHolder = new Powerup();
		this.PowerupHolder.init();
		
		this.PlayerHolder = new Player();
        this.PlayerHolder.init();
    }

    this.isLoaded = function () {
        return this.Texture.isLoaded() && this.Powerup.isLoaded() && this.Player.isLoaded();
    }
}