var Sounds = function () {
    
    //===========================================
    //Music

    this.MusicPlayer;
    var Music = function () {

        var self = this;
        var base_dir_music = "/client/sounds/music/";
        var menuMusic;
        var gameNormalMusic;
        this.gameNormalMusicLoaded = false;
        var gameNormalMusicPlaying = false;
        var gameItMusic;

        this.init = function () {
            /*
            menuMusic = new Audio(base_dir_music + "menu-loop.mp3");
            menuMusic.volume = .3;
            menuMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);

            gameItMusic = new Audio(base_dir_music + "game-it-loop.mp3");
            gameItMusic.volume = .1;
            gameItMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            */

            gameNormalMusic = new Audio();
            gameNormalMusic.volume = .4;
            gameNormalMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            gameNormalMusic.addEventListener('canplaythrough', function () {
                self.gameNormalMusicLoaded = true;
                this.play();
            }, false);
            gameNormalMusic.setAttribute("src", base_dir_music + "game-loop-normal.mp3");
            gameNormalMusic.load();
        }

        this.playNormalBackground = function () {
            //gameItMusic.stop();
            //menuMusic.stop();
            gameNormalMusic.currentTime = 0;
            gameNormalMusic.play();
            gameNormalMusicPlaying = true;
        }
        this.isNormalBackgroundPlaying = function () {
            return gameNormalMusicPlaying;
        }

        /*
        this.playMenu = function () {
            gameNormalMusic.stop();
            gameItMusic.stop();
            menuMusic.currentTime = 0;
            menuMusic.play();
        }

        this.playItBackground = function () {
            gameNormalMusic.stop();
            menuMusic.stop();
            gameItMusic.currentTime = 0;
            gameItMusic.play();
        }
        */
    }

    //===========================================
    //FX

    this.FXPlayer;
    var FX = function () {
        var base_dir_fx = "/client/sounds/fx/";

        self = this;
        var taggedPlayerSFX;
        var taggedOpponentSFX
        var collisionSFX;
        var menuSelectSFX;
        var menuMoveSFX;

        this.taggedPlayerSFXLoaded = false;
        this.taggedOpponentSFXLoaded = false;
        this.collisionSFXLoaded = false;
        this.menuSelectSFXLoaded = false;
        this.menuMoveSFXLoaded = false;

        this.init = function () {
            taggedPlayerSFX = new Audio();
            taggedPlayerSFX.volume = .7;
            taggedPlayerSFX.addEventListener('canplay', function () {
                self.taggedPlayerSFXLoaded = true;
            }, false);
            taggedPlayerSFX.setAttribute("src", base_dir_fx + "tagged-player.wav");
            taggedPlayerSFX.load();

            taggedOpponentSFX = new Audio();
            taggedOpponentSFX.volume = .7;
            taggedOpponentSFX.addEventListener('canplay', function () {
                self.taggedOpponentSFXLoaded = true;
            }, false);
            taggedOpponentSFX.setAttribute("src", base_dir_fx + "tagged-opponent.wav");
            taggedOpponentSFX.load();

            collisionSFX = new Audio();
            collisionSFX.volume = .3;
            collisionSFX.addEventListener('canplay', function () {
                self.collisionSFXLoaded = true;
            }, false);
            collisionSFX.setAttribute("src", base_dir_fx + "collision.wav");
            collisionSFX.load();

            menuSelectSFX = new Audio();
            menuSelectSFX.volume = .5;
            menuSelectSFX.addEventListener('canplay', function () {
                self.menuSelectSFXLoaded = true;
            }, false);
            menuSelectSFX.setAttribute("src", base_dir_fx + "menu-select.wav");
            menuSelectSFX.load();

            menuMoveSFX = new Audio();
            menuMoveSFX.volume = .3;
            menuMoveSFX.addEventListener('canplay', function () {
                self.menuMoveSFXLoaded = true;
            }, false);
            menuMoveSFX.setAttribute("src", base_dir_fx + "menu-move.wav");
            menuMoveSFX.load();
        }

        this.playTaggedPlayer = function () {
            if (this.taggedPlayerSFXLoaded) {
                taggedPlayerSFX.currentTime = 0;
                taggedPlayerSFX.play();
            }
        }

        this.playTaggedOpponent = function () {
            if (this.taggedOpponentSFXLoaded) {
                taggedOpponentSFX.currentTime = 0;
                taggedOpponentSFX.play();
            }
        }

        this.playCollision = function () {
            if (this.collisionSFXLoaded) {
                collisionSFX.currentTime = 0;
                collisionSFX.play();
            }
        }

        this.playMenuSelect = function () {
            if (this.menuSelectSFXLoaded) {
                menuSelectSFX.currentTime = 0;
                menuSelectSFX.play();
            }
        }

        this.playMenuMove = function () {
            if (this.menuMoveSFXLoaded) {
                menuMoveSFX.currentTime = 0;
                menuMoveSFX.play();
            }
        }
    }

    this.init = function () {
        this.FXPlayer = new FX();
        this.FXPlayer.init();
        this.MusicPlayer = new Music();
        this.MusicPlayer.init();
    }
}