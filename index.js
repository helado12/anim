window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
    keyword = "HAPPY BIRTHDAY APARNA",
		imageData,
		density =2,
		mouse = {},
		hovered = false,
		colors = ["236, 252, 17", "15, 245, 46", "15, 237,  245", "245, 15, 15", "245, 15, 214"],
		minDist = 30,
		bounceFactor = 5;

var W = window.innerWidth,
		H = window.innerHeight;

canvas.width = W;
canvas.height = H;

document.addEventListener("mousemove", function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}, false);

// Particle Object
var Particle = function() {
	this.w = Math.random() * 10.5;
	this.h = Math.random() * 10.5;
	this.x = -W;
	this.y = -H;
	this.free = false;
	
	this.vy = (-5 + parseInt(Math.random() * 10) / 2)/1.7;
	this.vx = (-4 + parseInt(Math.random() * 8))/1.6;
	
	// Color
	this.a = Math.random();
	this.color = colors[parseInt(Math.random()*colors.length)];
	
	this.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
	};
	
	this.draw = function() {
		ctx.fillStyle = "rgba("+this.color+","+this.a+")";
		ctx.fillRect(this.x, this.y,  this.w,  this.h);
	}
};

var particles = [];

// Draw the text
function drawText() {
	ctx.clearRect(0, 0, W, H);
	ctx.fillStyle = "#8800ff";
	ctx.font = "100px 'Arial', sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(keyword, W/2, H/2);
}

// Clear the canvas
function clear() {
	ctx.clearRect(0, 0, W, H);
}

// Get pixel positions
function positionParticles() {
	// Get the data
	imageData = ctx.getImageData(0, 0, W, W);
	data = imageData.data;
	
	// Iterate each row and column
	for (var i = 0; i < imageData.height; i += density) {
		for (var j = 0; j < imageData.width; j += density) {
			
			// Get the color of the pixel
			var color = data[((j * ( imageData.width * 4)) + (i * 4)) - 1];
			
			// If the color is black, draw pixels
			if (color == 255) {
				particles.push(new Particle());
				particles[particles.length - 1].setPosition(i, j);
			}
		}
	}
}

drawText();
positionParticles();


// Update
function update() {
	clear();
	
	for(i = 0; i < particles.length; i++) {
		var p = particles[i];
		
		if(mouse.x > p.x && mouse.x < p.x + p.w && mouse.y > p.y && mouse.y < p.y + p.h) 
			hovered = true;
		
		if(hovered == true) {
			
			var dist = Math.sqrt((p.x - mouse.x)*(p.x - mouse.x) + (p.y - mouse.y)*(p.y - mouse.y));
			
			if(dist <= minDist)
				p.free = true;
			
			if(p.free == true) {
				p.y += p.vy;
				p.vy += 0.05;
				p.x += p.vx;
				
				// Collision Detection
				if(p.y + p.h > H) {
					p.y = H - p.h;
					p.vy *= -bounceFactor;
					
					// Friction applied when on the floor
					if(p.vx > 0)
						p.vx -= 0.1;
					else 
						p.vx += 0.1;
				}
				
				if(p.x + p.w > W) {
					p.x = W - p.w;
					p.vx *= -bounceFactor;
				}
				
				if(p.x < 0) {
					p.x = 0;
					p.vx *= -0.5;
				}
			}
		}
		
		ctx.globalCompositeOperation = "lighter";
		p.draw();
	}
}


(function animloop(){
	requestAnimFrame(animloop);
	update();
})();