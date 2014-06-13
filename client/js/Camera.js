var Camera = function () {

    var ViewportWidth = 0;
    var ViewportHeight = 0;
    var CanvasWidth = 0;
    var CanvasHeight = 0;

    var upperBound = [0, 0];

    this.init = function (viewportWidth, viewportHeight, canvasWidth, canvasHeight) {
        ViewportWidth = viewportWidth;
        ViewportHeight = viewportHeight;
        CanvasWidth = canvasWidth;
        CanvasHeight = canvasHeight;
    }

    this.setFocus = function (x, y) {

        var boundX, boundY;

        //x
        if(x >= (CanvasWidth - (ViewportWidth / 2)))
            boundX = ViewportWidth - CanvasWidth;
        else if(x >= (ViewportWidth / 2))
            boundX = 0 - (x - (ViewportWidth / 2));
        else
            boundX = 0;
        //y
        if (y >= (CanvasHeight - (ViewportHeight / 2)))
            boundY = ViewportHeight - CanvasHeight;
        else if (y >= (ViewportHeight / 2))
            boundY = 0 - (y - (ViewportHeight / 2));
        else
            boundY = 0;

        upperBound = [boundX, boundY];
    }

    this.translateX = function (x) {
        return x + upperBound[0];
    }

    this.translateY = function (y) {
        return y + upperBound[1];
    }
}