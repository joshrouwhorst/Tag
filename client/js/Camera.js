var Camera = function () {

    var ViewportWidth = 0;
    var ViewportHeight = 0;
    var MapWidth = 0;
    var MapHeight = 0;

    var upperBound = [0, 0];

    this.init = function (viewportWidth, viewportHeight, mapWidth, mapHeight) {
        ViewportWidth = viewportWidth;
        ViewportHeight = viewportHeight;
        MapWidth = mapWidth;
        MapHeight = mapHeight;
    }

    this.setFocus = function (x, y) {

        var boundX, boundY;

        //x
        if(x >= (MapWidth - (ViewportWidth / 2)))
            boundX = ViewportWidth - MapWidth;
        else if(x >= (ViewportWidth / 2))
            boundX = 0 - (x - (ViewportWidth / 2));
        else
            boundX = 0;
        //y
        if (y >= (MapHeight - (ViewportHeight / 2)))
            boundY = ViewportHeight - MapHeight;
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