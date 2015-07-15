canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//resize canvas to fit window
context.canvas.width  = window.innerWidth - 20;		//POSSIBLE SCALING FIX HERE
context.canvas.height = window.innerHeight - 20;	//JK WE'LL SKIP IT

canvasX = null;
canvasY = null;

//mousedown listener for bubble pop detection
down = false;
canvas.addEventListener("mousedown", function(){
	down = true;
}, false);
canvas.addEventListener("mouseup", function(){
	down = false;
}, false);
canvas.addEventListener("mousemove", dragging, false);
function dragging(event) {
	if(down){
		canvasX = event.pageX;
		canvasY = event.pageY;
		console.log("X = " + canvasX + ", Y = " + canvasY);
	}
}

//determine ideal bubble size
var bubbleSize;
if(context.canvas.width < context.canvas.height){
	bubbleSize = context.canvas.width * .30;
} else {
	bubbleSize = context.canvas.height * .30;
}

//bubble/splat class
function Bubble (color) {
	this.height = bubbleSize;
	this.width = bubbleSize;
	this.popped = false;
	if(color == 0){
		this.color = "pink";
	}
	else if (color == 1) {
		this.color = "blue";
	}

	//make sure bubble is drawn within the bounds of the canvas
	this.x = Math.floor((Math.random() * (canvas.width - this.width)));
	this.y = Math.floor((Math.random() * (canvas.height - this.height)));

	//draw the bubble using the context variable
	this.draw = function(context_draw) {
		if (!this.popped){
			//select corresponding bubble to draw
			if(this.color == "pink"){
				img = bubblePink;
			}
			else if(this.color == "blue"){
				img = bubbleBlue;
			}
		} else {
			//select corresponding splat to draw
			if(this.color == "pink"){
				img = splatPink;
			}
			else if(this.color == "blue"){
				img = splatBlue;
			}
		}
		//draw the image in the specified
        context_draw.drawImage(img, this.x, this.y, this.width, this.height);
    };
}

bubbleArray = [];
currentBubble = null;
i = null;
j = null;
music = [pop,pop];
newBubbleQueued = false;

//function to repeat 30 times per second, updating the game
setInterval(function(){
	
	//clear the playing field
	context.clearRect(0, 0, canvas.width, canvas.height);

	//if no bubbles exist, make one
	if(bubbleArray.length == 0){
		bubbleArray[0] = new Bubble(Math.round(Math.random()));
	}

	//check if most recent bubble has been popped
	bubbleNum = bubbleArray.length - 1;
	currentBubble = bubbleArray[bubbleNum];
	if (currentBubble.popped == false){
		//rectangular collision checking if bubble has been popped
		if (currentBubble.x < canvasX 
			&& (currentBubble.x + bubbleSize) > canvasX  
			&& currentBubble.y < canvasY 
			&& (currentBubble.y + bubbleSize) > canvasY){
				music[bubbleNum % 1].play();
				currentBubble.popped = true;
				newBubbleQueued = false;
		}
		//if bubble has been popped, make a new one
	} else if (!newBubbleQueued) {
		newBubbleQueued = true;
		canvasX = null;
		canvasY = null;
		setTimeout(function(){
			bubbleArray[bubbleArray.length] = new Bubble(Math.round(Math.random()));
			return;
		}, 1000);
	}

	//draw bubbles/splats to canvas
	//bubbleArray[bubbleArray.length] = new Bubble(Math.round(Math.random()));
	for (i = 0; i < bubbleArray.length; i++){
		bubbleArray[i].draw(context);
	}

}, 33);
