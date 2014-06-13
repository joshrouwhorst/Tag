var Sounds = function () {
    
    //===========================================
    //Music

    this.Music = function () {
        var base_dir_music = "../client/sounds/music/";
        var menuMusic;
        var gameNormalMusic;
        var gameItMusic;

        this.init = function () {
            menuMusic = new Audio(base_dir_music + "menu-loop.mp3");
            menuMusic.volume = .3;
            menuMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);

            gameNormalMusic = new Audio(base_dir_music + "game-normal-loop.mp3");
            gameNormalMusic.volume = .1;
            gameNormalMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);

            gameItMusic = new Audio(base_dir_music + "game-it-loop.mp3");
            gameItMusic.volume = .1;
            gameItMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        this.playMenu = function () {
            gameNormalMusic.stop();
            gameItMusic.stop();
            menuMusic.currentTime = 0;
            menuMusic.play();
        }

        this.playNormalBackground = function () {
            gameItMusic.stop();
            menuMusic.stop();
            gameNormalMusic.currentTime = 0;
            gameNormalMusic.stop();
        }

        this.playMenu = function () {
            gameNormalMusic.stop();
            menuMusic.stop();
            gameItMusic.currentTime = 0;
            gameItMusic.play();
        }
    }

    //===========================================
    //FX

    this.FX = function () {
        var base_dir_fx = "../client/sounds/fx/";
        var taggedPlayerSFX;
        var taggedOpponentSFX
        var collisionSFX;
        var menuSelectSFX;
        var menuMoveSFX;

        this.init = function () {
            taggedPlayerSFX = new Audio(base_dir_fx + "tagged-player.wav");
            taggedPlayerSFX.volume = .3;

            taggedOpponentSFX = new Audio(base_dir_fx + "tagged-opponent.wav");
            taggedOpponentSFX.volume = .3;

            collisionSFX = new Audio(base_dir_fx + "collision.wav");
            collisionSFX.volume = .1;

            menuSelectSFX = new Audio(base_dir_fx + "menu-select.wav");
            menuSelectSFX.volume = .5;

            menuMoveSFX = new Audio(base_dir_fx + "menu-move.wav");
            menuMoveSFX.volume = .3;
        }

        this.playTaggedPlayer = function () {
            taggedPlayerSFX.currentTime = 0;
            taggedPlayerSFX.play();
        }

        this.playTaggedOpponent = function () {
            taggedOpponentSFX.currentTime = 0;
            taggedOpponentSFX.play();
        }

        this.playCollision = function () {
            collisionSFX.currentTime = 0;
            collisionSFX.play();
        }

        this.playMenuSelect = function () {
            menuSelectSFX.currentTime = 0;
            menuSelectSFX.play();
        }

        this.playCollision = function () {
            collisionSFX.currentTime = 0;
            collisionSFX.play();
        }
    }

    this.init = function () {
        this.Music.init();
        this.FX.init();
    }
}