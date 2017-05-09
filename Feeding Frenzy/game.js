// *** THAY DOI CON TRO CHUOT
/*
         <script type="text/javascript">
      document.getElementsByTagName("body")[0].style.cursor = "url('http://mangvn.org/2005/anh/chuot/harlequin.cur'), auto";
      </script>
*/

var xCoordBefore = 0                       //Dùng một biến x để lưu tọa độ trước, dùng kiểm tra nếu di chuột qua trái phải thì đổi ảnh, sau này tương tự với y
var mouseMoveDirection = "right"

var trailimageLR=["images/rightfish.gif", 150, 150] //Nguồn con trỏ chuột, width, height
var trailimageRL=["images/leftfish.gif", 150, 150] //Nguồn con trỏ chuột, width, height

var trailimage = trailimageLR         //Khởi tạo ảnh chuột ban đầu khi mới vào 

var offsetfrommouse=[-trailimage[1]/2,-trailimage[2]/2] //Vị trí hiển thị ảnh động so với con trỏ chuột,  canh giữa thôi, tùy chỉnh thay đổi
var displayduration=0 //thời gian hiển thị ảnh con trỏ chuột theo 1/1000 second, để 0 mặc định luôn hiển thị


if (document.getElementById || document.all){
   document.write('<div name="cursor" id="trailimageid" style="position:absolute;visibility:visible;left:500px;top:200px;width:100px;height:auto" ><img id = "cursorID" src="'+trailimage[0]+'" border="0" width="'+trailimage[1]+'px" height= auto"><\/div>')
}

////

function gettrailobj(){
   if (document.getElementById){
      return document.getElementById("trailimageid").style
   } else if (document.all){
      return document.all.trailimagid.style
   }         
}


function truebody(){
   return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function hidetrail(){
   gettrailobj().visibility="hidden"
   document.onmousemove=""
}

function updateMouseCursor(){ //Hàm cập nhật lại vị trí, kích thước, nguồn ảnh con trỏ
   document.getElementById("cursorID").src = trailimage[0]
   document.getElementById("cursorID").width = trailimage[1]
   offsetfrommouse[0] = -trailimage[1]/2
   offsetfrommouse[1] = -trailimage[2]/2
}

function followmouse(e){
   //Đoạn này kiểm tra chuột di phải hoặc trái thì thay đổi ảnh   
   if (typeof e != "undefined"){
         if(e.pageX > xCoordBefore && mouseMoveDirection == "left"){           
            trailimage = trailimageLR
            mouseMoveDirection = "right"       //Chuyển hướng trái sang phải

            updateMouseCursor()
                      
           
         } else if( e.pageX < xCoordBefore && mouseMoveDirection == "right") {
            trailimage = trailimageRL
            mouseMoveDirection = "left"        //Chuyển hướng phải sang trái
            updateMouseCursor()
                
         }
         xCoordBefore = e.pageX         
   }
   //////////////////////////////////////////////////////////////

   var xcoord=offsetfrommouse[0]
   var ycoord=offsetfrommouse[1]

   if (typeof e != "undefined"){
      xcoord+=e.pageX
      ycoord+=e.pageY
   } else if (typeof window.event !="undefined")
   {
      xcoord+=truebody().scrollLeft+event.clientX
      ycoord+=truebody().scrollTop+event.clientY
   }

   var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
   var docheight=document.all? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight)

    
   if (xcoord + trailimage[1] > bgRight){

      //Thực hiện chuyển màn hình sang phải
      turnRight();
      return;      
   }

   if (xcoord < bgLeft){
       //Thực hiện chuyển màn hình sang trái
      turnLeft();
      return;     
   } 

   if (ycoord + trailimage[2] > bgBottom){
      //Thực hiện chuyển màn hình xuống dưới
      turnDown();
      return;      
   } 

   if (ycoord  < bgTop){
      //Thực hiện chuyển màn hình lên trên
      turnUp();
      return;      
   }     
   
   stopScreen(); //Nếu không di chuyển các vị trí biên thì dừng màn hình

   gettrailobj().left=xcoord+"px"
   gettrailobj().top=ycoord+"px"    

}

document.onmousemove=followmouse

if (displayduration>0){
   setTimeout("hidetrail()", displayduration*1000)
}
///////////////////////////////////////////////////////////////////

// *** HINH NEN GAME VA NHAN VAT CAC SINH VAT BIEN
var   STARTING_BACKGROUND_OFFSET = 0,    //Vị trí tọa độ màn hình so với tọa độ gốc, dùng dịch chuyển màn hình context.translate
      BACKGROUND_VELOCITY = 200,          //Tốc độ dịch chuyển
      STARTING_BACKGROUND_OFFSET = 0,
      
      //GIÁ TRỊ MẶC ĐỊNH, SỬ DỤNG Ở LÚC KHỞI TẠO HOẶC TUY CHỈNH CÂN ĐỐI THEO MÀN HÌNH
      BACKGROUND_TOP = 15,
      BACKGROUND_LEFT = 200,
   
   canvas = document.getElementById('game-canvas'),
   context = canvas.getContext('2d'),
   
   // *** CÁC  BIÊN CỦA KHUNG CANVAS 
   bgTop = BACKGROUND_TOP,
   bgLeft = BACKGROUND_LEFT,
   bgRight = bgLeft +canvas.width,
   bgBottom = bgTop +canvas.height,

   background  = new Image(),                    //Hình nền khung canvas
   
   backgroundOffset_X = STARTING_BACKGROUND_OFFSET,   //Giá trị độ dời tọa độ khung canvas
   backgroundOffset_Y = STARTING_BACKGROUND_OFFSET,

   bgVelocity_X = BACKGROUND_VELOCITY,
   bgVelocity_Y = BACKGROUND_VELOCITY
   
   lastAnimationFrameTime = 0,
   lastFpsUpdateTime = 0,
   fps = 60


function draw() {                 //Hàm chung vẽ mọi thứ trong game 
   setbackgroundOffset_X();
   drawBackground();  
}

function setbackgroundOffset_X() {
   var offsetX = backgroundOffset_X + bgVelocity_X/fps;
   var offsetY = backgroundOffset_Y + bgVelocity_Y/fps;

   if(offsetX <= 0){
      backgroundOffset_X = 0;
   } else if (offsetX > background.width - canvas.width){
      backgroundOffset_X += 0;
   } else {
      backgroundOffset_X = offsetX
   }

   if(offsetY <= 0){
      backgroundOffset_Y = 0;
   } else if (offsetY > background.height - canvas.height){
      backgroundOffset_Y += 0;
   } else {
      backgroundOffset_Y = offsetY;
   }

   
}

function drawBackground(){
  
   context.translate(-backgroundOffset_X, -backgroundOffset_Y);   
   // Initially onscreen:
   context.drawImage(background, 0, 0);
   // Initially offscreen:
   //context.drawImage(background, background.width, 0);
   
   context.translate(backgroundOffset_X, backgroundOffset_Y);   
}

function calculateFps(now) {
   var fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;      
   }
   return fps; 
}


function turnLeft() {                  //Dịch chuyển màn hình sang trái
  
   bgVelocity_X = -BACKGROUND_VELOCITY;
}

function turnRight() {
      
      bgVelocity_X = BACKGROUND_VELOCITY;   //Dịch chuyển màn hình sang phải
}

function turnUp(){                      //Dịch chuyển màn hình lên trên
      bgVelocity_Y = -BACKGROUND_VELOCITY;
}

function turnDown(){                      //Dịch chuyển màn hình xuống dưới
      bgVelocity_Y = BACKGROUND_VELOCITY;
}

function stopScreen(){
   
   bgVelocity_X = 0;                     //Dừng dịch chuyển màn hình
   bgVelocity_Y = 0;
}




function animate(now) { 
   fps = calculateFps(now); 
   draw();
   requestNextAnimationFrame(animate);
}


   // ------------------------- INITIALIZATION ----------------------------
//KHỞI TẠO VỊ TRÍ KHUNG CANVAS
document.getElementById("game-canvas").style.left = BACKGROUND_LEFT + "px";
document.getElementById("game-canvas").style.top = BACKGROUND_TOP + "px";

function initializeImages() {
   background.src = "images/background_level1.jpg"; 
   stopScreen()                //Ban đầu màn hình đứng yên
   
   background.onload = function (e) {      
      startGame();
   };   
}

function startGame() {
   window.requestNextAnimationFrame(animate);
}

setInterval(function(){
   console.log("backgroundOffset_X= " + backgroundOffset_X);
},200);
initializeImages();
///////////////////////////////////////////////////////////////////
