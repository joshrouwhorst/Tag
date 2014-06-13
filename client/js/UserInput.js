var UserInput = function () {

    var isUpKeyDown = false;
    var isDownKeyDown = false;
    var isRightKeyDown = false;
    var isLeftKeyDown = false;
    var isMKeyDown = false;
    var isSpaceKeyDown = false;

    this.init = function () {
        //track input
        addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 38:
                case 87:
                    isUpKeyDown = true;
                    break;
                case 40:
                case 83:
                    isDownKeyDown = true;
                    break;
                case 39:
                case 68:
                    isRightKeyDown = true;
                    break;
                case 37:
                case 65:
                    isLeftKeyDown = true;
                    break;
                case 77:
                    isMKeyDown = true;
                    break;
                case 32:
                    isSpaceKeyDown = true;
                    break;
            }
        }, false);

        addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 38:
                case 87:
                    isUpKeyDown = false;
                    break;
                case 40:
                case 83:
                    isDownKeyDown = false;
                    break;
                case 39:
                case 68:
                    isRightKeyDown = false;
                    break;
                case 37:
                case 65:
                    isLeftKeyDown = false;
                    break;
                case 77:
                    isMKeyDown = false;
                    break;
                case 32:
                    isSpaceKeyDown = false;
                    break;
            }
        }, false);
    }

    this.update = function () {
        if (isUpKeyDown) {
            //player go up
            console.log("up");
            socket.emit('goUp');
        }
        if (isDownKeyDown) {
            //player go down
            console.log("down");
            socket.emit('goDown');
        }
        if (isRightKeyDown) {
            //player go right
            console.log("right");
            socket.emit('goRight');
        }
        if (isLeftKeyDown) {
            //player go left
            console.log("left");
            socket.emit('goLeft');
        }
        if (isMKeyDown) {
            //open menu
            console.log("m");
        }
        if (isSpaceKeyDown) {
            //TAG!
            console.log("space");
        }

    }

    this.draw = function (ctx) {
        //draw stuff here?
    }

    // ----- uncomment the following to track key codes in console -----
    //document.onkeydown = function (event) {
    //    console.log(event.keyCode); //what key did I press?
    //    if (event.keyCode == 39) //right arrow
    //    {
    //        rightArrowHit = true;
    //    }
    //    if (event.keyCode == 37) //left arrow
    //    {
    //        leftArrowHit = true;

    //    }
    //    if (event.keyCode == 32) //space
    //    {
    //        spaceBarHit = true;

    //    }
    //}
}