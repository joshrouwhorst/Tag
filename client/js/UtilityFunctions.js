function Util_GetRandomPosition(canvasWidth, canvasHeight){
	var x = Math.random() * width;
	var y = Math.random() * height;
	
	//return array with x-coord as element 0, and y-coord as element 1
	return new int[]{x, y};
}