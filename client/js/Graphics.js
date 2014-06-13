var Graphics = function () {
    
    //===========================================
    //Texture

    this.Texture = function () {
        var base_dir = "../graphics/texture/";
        
        //Grass block
        var grassReady = false;
        var grass = new Image();
        grass.onload = function () {
            grassReady = true;
        };
        grass.src = base_dir + "grass.png";

        //Overgrown grass block
        var grassOvergrownReady = false;
        var grassOvergrown = new Image();
        grassOvergrown.onload = function () {
            grassOvergrownReady = true;
        };
        grassOvergrown.src = base_dir + "overgrown.png";

        //Boundary
        var boundaryWallReady = false;
        var boundaryWall = new Image();
        boundaryWall.onload = function () {
            boundaryWallReady = true;
        };
        boundaryWall.src = base_dir + "wall-dark.png";

        //Walls
        var wallReady = false;
        var wall = new Image();
        wall.onload = function () {
            wallReady = true;
        };
        wall.src = base_dir + "wall-light.png";

        this.init = function () {

        }

        this.isLoaded = function () {
            return grassReady && grassOvergrownReady && boundaryWallReady && wallReady;
        }
    }

    //===========================================
    //Powerups

    this.Powerup = function () {
        var base_dir = "../graphics/powerup/";

        this.init = function () {

        }

        this.isLoaded = function () {
            return true;
        }
    }

    //===========================================
    //Player

    this.Player = function () {
        var base_dir = "../graphics/player/";

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
        this.Texture.init();
        this.Powerup.init();
        this.Player.init();
    }

    this.isLoaded = function () {
        return this.Texture.isLoaded() && this.Powerup.isLoaded() && this.Player.isLoaded();
    }
}