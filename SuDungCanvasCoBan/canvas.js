	window.onload = function(){
		var img = new Image();
		img.onload = function(){
			invertColor(this);
		};
		img.src = "panda.jpg";
	}

	function invertColor(img){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		// draw image at top-left corner
		context.drawImage(img,0,0);
		//draw original image right beside the previous image
		context.drawImage(img, img.width,0);
		//get ImageData object from the left image
		
		var ImageData = context.getImageData(0,0,img.width,img.height);
		var data = imageData.data;
		for (var i = 0; i< data.length; i+=4){
			data[i] = 255 - data[i]; //red
			data[i+1] = 255- data[i+1]; //green
			data[i+2] = 255 - data[i+2]; //blue
			data[i+3] = 255; //alpha
		}
		context.putImageData(imageData,0,0);
		
	}


	function draw(){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		context.strokeStyle = "red";
		context.fillStyle = "green";
		context.strokeRect = (20,20,140,140);
		context.fillRect(20,20,140,140);

		context.moveTo(10,10);
		context.lineTo(150,50);
		context.lineTo(10,50);
		context.lineTo(140,140);
		context.stroke();
	}
