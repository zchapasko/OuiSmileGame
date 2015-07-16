var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mousedown = false;

redBubble = new Image();
redBubble.src = "images/bubble_red.png";
redBubble.addEventListener("load",init,false);

redX = Math.floor((Math.random() * 250) + 1);
redY = Math.floor((Math.random() * 100) + 1);

// blueBubble = new Image();
// blueBubble.src = "images/bubble_blue.png";
// blueBubble.addEventListener("load",init,false);

var requestAnimFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000/60);
		};

function init(){
	requestAnimFrame(update);
}

function update(){
	redY += 3;
	context.clearRect(0,0,400,400);
	context.drawImage(redBubble, redX, redY, 50, 50);
	//context.fillRect(20, 20, 40, 120, "#000000");
	// context.drawImage(redBubble, Math.floor((Math.random() * 250) + 1), Math.floor((Math.random() * 100) + 1), 50, 50);
	requestAnimFrame(update);
}

