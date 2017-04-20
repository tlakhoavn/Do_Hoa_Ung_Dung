	window.onload = function(){
		var img = new Image();
		img.onload = function(){
			invertColor(this);		
		};
		img.src = "panda.jpg";
	}

	function invertColor(img){
		var canvas = document.getElementById("ID_CV_IMAGE_PANDA");
		var context = canvas.getContext("2d");
		// draw image at top-left corner
		context.drawImage(img,0,0);
		//draw original image right beside the previous image
		context.drawImage(img, img.width,0);
		//get ImageData object from the left image
		
		var imageData = context.getImageData(0,0,img.width,img.height);
		
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
	
	//---------------PHAT VIDEO
	//khởi tạo các đối tượng
	var $video         =  $('video#video');
	var $player        = $video[0];
	var $bt_play_pause = $('#bt_play_pause');
	var $bt_big        = $('#bt_big');
	var $bt_small      = $('#bt_small');
	var $bt_speed_down = $('#bt_speed_down');
	var $bt_speed_up   = $('#bt_speed_up');
	var $bt_fullscreen = $('#bt_fullscreen');
	var $bt_back       = $('#bt_back');
	//Play/Pause control clicked
	$bt_play_pause.on('click', function() {
	     if($player.paused) { //kiểm tra xem player đang chạy hay dừng,nếu player đang dừng thì thực hiện play và ngược lại
	          $player.play();
	     }
	     else {
	          $player.pause();
	     }
	     return false;
	});



	////-XU LY VIDEO MEOMEO
	document.addEventListener('DOMContentLoaded', function(){
	    var v = document.getElementById("ID_VIDEO_MEOMEO");
	    var canvas = document.getElementById("ID_CV_VIDEO_MEOMEO");
	    var context = canvas.getContext("2d");

	    var cw = Math.floor(canvas.clientWidth / 100);
	    var ch = Math.floor(canvas.clientHeight / 100);
	    canvas.width = cw;
	    canvas.height = ch;

	    v.addEventListener('play', function(){
	        draw(this,context,cw,ch);
	    },false);

	},false);

	function draw(v,c,w,h) {
	    if(v.paused || v.ended) return false;
	    c.drawImage(v,0,0,w,h);
	    setTimeout(draw,20,v,c,w,h);
	}
