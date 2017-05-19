// *** Lớp Scene_1 cảnh nền trong game, sau phát triển thì sẽ là mảng các cảnh khác nhau //////////////////////////////////
var Scene_1 = {
    m_top: 0,
    m_left: 0,
    m_width: 0,
    m_height: 0,
    m_src: "images/background_level1.jpg",
    m_velocity: 200,

    init: function() {
        //var width = this.truebody().clientWidth;
        var width = this.truebody().scrollWidth;
        var height = this.truebody().clientHeight;

        this.m_width = width * 10 / 12;
        this.m_left = width / 12;
        this.m_top = 20;
        this.m_height = height - 15 - this.m_top;

    },

    truebody: function() {
        return (!window.opera && document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body
    },
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *** Lớp Fish_Type_1 là nhân vật cá trong game, sau phát triển sẽ có những loại cá khác//////////////////////////////////
var Fish_Type_1 = {
    m_size: 1, //Kích thước cá, có 3 kích thước tương ứng độ lớn tăng dần
    m_point: 0, //Điểm số trong game

    m_width: 100,
    m_height: 100,

    m_state: "left", //Trạng thái của cá, hiện tại thì bơi sang trái và sang phải
    m_src: "images/rightfish.gif",

    getWidth: function(level) {
        with(this) {
            switch (level) {
                case 1:
                    return this.m_width;
                case 2:
                    return this.m_width * 1.5;
                case 3:
                    return this.m_width * 2;
            }
            return this.m_width;
        }
    },

    getHeight: function() {
        with(this) {
            switch (this.m_size) {
                case 1:
                    return this.m_height;
                case 2:
                    return this.m_height * 1.5;
                case 3:
                    return this.m_height * 2;
            }
            return this.m_height;
        }
    },

    getSrc: function() {
        with(this) {
            return this.m_src;
        }
    },

    changeState: function(state) {
        with(this) {
            switch (state) {
                case "left":
                    this.m_src = "images/leftfish.gif";
                    break;
                case "right":
                    this.m_src = "images/rightfish.gif";
                    break;
            }

        }
    },
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Cái này bị bạn Khang hiểu nhầm sang Marine_source rồi, huhu
// *** Mảng chứa các đối tượng là các sinh vật biển, các loại cá trong trò chơi////////////////////////////////////////////
var arrayMarine = [
   //Loại cá 1
   {
      top: 50,
      left: 0,
      width: 30,
      height: 30,
      src: "images/marines/Fish1.gif",
      size: 1,
      
      velocityX: -50,
      velocityY: 0,

      offsetX: 0,
      offsetY: 0,
   },

   //Loại cá 2
   {
      top: 150,
      left: 0,
      width: 40,
      height: 40,
      src: "images/marines/Fish2.gif",
      size: 3,

      velocityX: -40,
      velocityY: 0,

      offsetX: 0,
      offsetY: 0,
   },

   //Loại cá 3
   {
      top: 230,
      left: 0,
      width: 50,
      height: 50,
      src: "images/marines/Fish3.gif",
      size: 3,

      velocityX: -30,
      velocityY: 0,

      offsetX: 0,
      offsetY: 0,
   }
];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

// *** Lớp MyScene quản lý các thông số của màn hình ở màn hiện tại đang chơi//////////////////////////////////////////////
var MyScene = {
    m_top: 0,
    m_left: 0,
    m_right: 0,
    m_bottom: 0,

    m_image: new Image(), //Hình nền khung canvas

    m_offsetX: 0,
    m_offsetY: 0,

    m_velocityX: 0,
    m_velocityY: 0,

    init: function() {
        Scene_1.init();

        document.getElementById("game-canvas").style.left = Scene_1.m_left + "px";
        document.getElementById("game-canvas").style.top = Scene_1.m_top + "px";
        document.getElementById("game-canvas").style.width = Scene_1.m_width + "px";
        document.getElementById("game-canvas").style.height = Scene_1.m_height + "px";

        this.m_top = Scene_1.m_top;
        this.m_left = Scene_1.m_left;
        this.m_right = this.m_left + Scene_1.m_width;
        this.m_bottom = this.m_bottom + Scene_1.m_height;

        this.m_image.src = Scene_1.m_src;

    },

    moveLeft: function() { //Dịch chuyển màn hình sang trái  
        this.m_velocityX = -Scene_1.m_velocity;
    },

    moveRight: function() {
        this.m_velocityX = Scene_1.m_velocity; //Dịch chuyển màn hình sang phải
    },

    moveUp: function() { //Dịch chuyển màn hình lên trên
        this.m_velocityY = -Scene_1.m_velocity;
    },

    moveDown: function() { //Dịch chuyển màn hình xuống dưới
        this.m_velocityY = Scene_1.m_velocity;
    },

    standScreen: function() { //Dừng dịch chuyển màn hình
        this.m_velocityX = 0;
        this.m_velocityY = 0;
    },
    draw: function() {
        this.setOffset(); //Tính lại độ dời của hệ tọa độ

        MyGame.m_context.translate(-this.m_offsetX, -this.m_offsetY);
        // Initially onscreen:
        MyGame.m_context.drawImage(MyScene.m_image, 0, 0);
        // Initially offscreen:
        //MyGame.m_context.drawImage(background, background.width, 0);   
        MyGame.m_context.translate(this.m_offsetX, this.m_offsetY);

        //se nho cho nay
        //console.log("width="+MyScene.getBackGroundWidth());
    },

    //////////////////////
    setOffset: function() {
        var offsetX = this.m_offsetX + this.m_velocityX / MyGame.m_fps;
        var offsetY = this.m_offsetY + this.m_velocityY / MyGame.m_fps;

        if (offsetX <= 0) {
            this.m_offsetX = 0;
        } else if (offsetX > this.m_image.width - MyGame.m_canvas.width) {
            this.m_offsetX += 0;
        } else {
            this.m_offsetX = offsetX
        }

        if (offsetY <= 0) {
            this.m_offsetY = 0;
        } else if (offsetY > this.m_image.height - MyGame.m_canvas.height) {
            this.m_offsetY += 0;
        } else {
            this.m_offsetY = offsetY;
        }

    },

    getBackGroundWidth: function() {

        //return MyScene.m_image.width;
        return 1920;
    },

    getBackGroundHeight: function() {
        //return MyScene.m_image.height;
        return 1080;
    },

    getCanvasWidth: function() {
        var value = this.m_right - this.m_left;
        return value;
    },

    getCanvasHeight: function() {
        var value = this.m_bottom - this.m_top;
        return value;
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *** Lớp MyFish quản lý các thao tác xử lý với con trỏ chuột là cá của người chơi////////////////////////////////////////
var MyFish = {
    m_XCoordBefore: 0, //Dùng một biến x để lưu tọa độ trước, dùng kiểm tra nếu di chuột qua trái phải thì đổi ảnh, sau này tương tự với y
    m_OffsetFromMouse: [0, 0], //Vị trí hiển thị ảnh động so với con trỏ chuột,  canh giữa thôi, tùy chỉnh thay đổi
    m_xCoor: 0,
    m_yCoor: 0,
    m_Level: 1,

    init: function() {
        this.m_Fish = Fish_Type_1;
        this.m_OffsetFromMouse[0] = -this.Fish / 2; //Đặt vị trí chuột ở giữa so với ảnh cá
        this.m_OffsetFromMouse[1] = -this.Fish / 2;

        if (document.getElementById || document.all) {
            document.write('<div name="cursor" id="trailimageid" style="position:absolute;visibility:visible;left:500px;top:200px;width:100px;height:auto" ><img id = "cursorID" src="' + this.m_Fish.getSrc() + '" border="0" width="' + this.m_Fish.getWidth(this.m_Level) + 'px" height= auto"><\/div>')
        }
        document.onmousemove = this.followMouse;
    },

    getLevel: function() {
        return this.m_Level;
    },

    setLevel: function(value) { //Set level cho cá
        if (value >= 1 && value <= 3) {
            this.m_Level = value;
            this.update();
        }
    },

    //Trả về độ lớn của chuột cá
    getWidth: function() {
        return this.m_Fish.getWidth(this.m_Level);
    },

    getMouseCoord: function() {
        var MouseCoord = [0, 0];

        //Đây là tọa độ so với gốc 0,0 ở trên trái màn hình
        MouseCoord[0] = MyFish.m_xCoord - MyFish.m_OffsetFromMouse[0];
        MouseCoord[1] = MyFish.m_yCoord - MyFish.m_OffsetFromMouse[1];
        //Đây là tọa độ so với gốc 0,0 của khung canvas trên khung hình hiện tại
        MouseCoord[0] -= MyScene.m_left;
        MouseCoord[1] -= MyScene.m_top;
        //Đây là tọa độ so với gốc 0,0 của khung canvas trên vị trí hiện tại so với cả nền
        MouseCoord[0] += MyScene.m_offsetX;
        MouseCoord[1] += MyScene.m_offsetY;

        return MouseCoord;
    },

    followMouse: function(e) {

        //Đoạn này kiểm tra chuột di phải hoặc trái thì thay đổi ảnh   
        if (typeof e != "undefined") {
            if (e.pageX > MyFish.m_xCoordBefore) {
                MyFish.changeState("right");

            } else if (e.pageX < MyFish.m_xCoordBefore) {
                MyFish.changeState("left");
            }
            MyFish.m_xCoordBefore = e.pageX
        }
        //////////////////////////////////////////////////////////////

        MyFish.m_xCoord = MyFish.m_OffsetFromMouse[0];
        MyFish.m_yCoord = MyFish.m_OffsetFromMouse[1];

        var ScreenMovingX = false; //Màn hình đang di chuyển theo chiều X trái phải
        var ScreenMovingY = false; //Màn hình đang di chuyển theo chiều Y lên xuống
        var TouchWallX = false; //Trạng thái chạm tường bên lề trái hoặc phải
        var TouchWallY = false; //Trại thái chạm tường bên lề trên hoặc dưới

        var spaceFromWall = 10; //Khoảng cách trương đối với tường

        if (typeof e != "undefined") {
            MyFish.m_xCoord += e.pageX
            MyFish.m_yCoord += e.pageY
        } else if (typeof window.event != "undefined") {
            MyFish.m_xCoord += MyFish.truebody().scrollLeft + event.clientX
            MyFish.m_yCoord += MyFish.truebody().scrollTop + event.clientY
        }


        if (MyFish.m_xCoord + MyFish.m_Fish.getWidth(MyFish.getLevel()) > MyScene.m_right - spaceFromWall) {
            //Thực hiện chuyển màn hình sang phải       
            if (MyScene.m_offsetX < MyScene.getBackGroundWidth() - MyScene.getCanvasWidth()) {
                MyScene.moveRight();
            } else {
                MyScene.standScreen();
            }
            ScreenMovingX = true;

        }

        if (MyFish.m_xCoord < MyScene.m_left + spaceFromWall) {
            //Thực hiện chuyển màn hình sang trái       
            if (MyScene.m_offsetX > 0) {
                MyScene.moveLeft();
            } else {
                MyScene.standScreen();
            }
            ScreenMovingX = true;

        }

        if (MyFish.m_yCoord + MyFish.m_Fish.getHeight() / 2 > MyScene.m_bottom - spaceFromWall) {
            //Thực hiện chuyển màn hình xuống dưới
            //console.log("offsetY="+MyScene.m_offsetY);
            if (MyScene.m_offsetY < MyScene.getBackGroundHeight() - MyScene.getCanvasHeight()) {
                MyScene.moveDown();
            } else {
                MyScene.standScreen();
            }

            ScreenMovingY = true;
        }

        if (MyFish.m_yCoord < MyScene.m_top + spaceFromWall) {
            //Thực hiện chuyển màn hình lên trên

            if (MyScene.m_offsetY > 0) {
                MyScene.moveUp();
            } else {
                MyScene.standScreen();
            }
            ScreenMovingY = true;
        }

        //Ý nghĩa, nếu màn hình không di chuyển và cá không chạm tường thì cá di chuyển, người lại thì cá đứng yên
        if (ScreenMovingX == false) {
            MyFish.gettrailobj().left = MyFish.m_xCoord + "px";
        }
        if (ScreenMovingY == false) {
            MyFish.gettrailobj().top = MyFish.m_yCoord + "px";
        }

        if (ScreenMovingX == false && ScreenMovingY == false) {
            MyScene.standScreen(); //Nếu không di chuyển các vị trí biên thì dừng màn hình chỉ cá di chuyển theo chuột
        }
    },

    getDirection: function() { //Trả về hướng di chuyển của cá, hiện tại là "left" hoặc "right"
        return this.m_direction;
    },

    //////////////////////////////////
    m_direction: "right", //Hướng di chuyển của chuột, dùng để hạn chế phép gán nhiều lần ở hàm changeState
    changeState: function(state) {
        switch (state) {
            case "left":
                if (this.m_direction != "left") {
                    this.m_Fish.changeState(state);
                    this.update();
                    this.m_direction = "left";
                }
                break;
            case "right":
                if (this.m_direction != "right") {
                    this.m_Fish.changeState(state);
                    this.update();
                    this.m_direction = "right";
                }
                break;
        }
    },

    update: function() { //Hàm cập nhật lại vị trí, kích thước, nguồn ảnh con trỏ   
        document.getElementById("cursorID").src = this.m_Fish.getSrc()
        document.getElementById("cursorID").width = this.m_Fish.getWidth(MyFish.getLevel())
        this.m_OffsetFromMouse[0] = -this.m_Fish.getWidth(MyFish.getLevel()) / 2
        this.m_OffsetFromMouse[1] = -this.m_Fish.getHeight() / 2
    },

    truebody: function() {
        return (!window.opera && document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body
    },

    gettrailobj: function() {
        if (document.getElementById) {
            return document.getElementById("trailimageid").style
        } else if (document.all) {
            return document.all.trailimagid.style
        }
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// *** Lớp Controls hiện chức năng chính trong game //////////////////////////////////////////////////////////////////////
//Thực hiện các chức năng quản lý trò chơi như dừng, chạy tiếp
var Controls = {
    m_gameState: "playing", //Trạng thái game playing hoặc paused
    init: function() {
        document.onkeydown = this.keydownevent
    },

    isThisGamePlaying: function() {
        if (this.m_gameState == "playing") {
            return true;
        }
        return false;
    },
    drawPausedState: function() {
        //console.log("DRAWING......");
    },
    ///////////////////////////////////////////
    keydownevent: function(e) {
        switch (e.keyCode) {
            case 80:
                Controls.checkPaused();
                break;
        }
    },

    checkPaused: function() {
        if (this.m_gameState == "playing") {
            this.paused();
        } else if (this.m_gameState == "paused") {
            this.playAgain();
        }

    },
    paused: function() {
        console.log("PAUSED");
        var img = new Image();
        img.src = "images/control/paused.png";

        this.tmpContext = MyGame.m_context;

        this.tmpContext.save();
        img.onload = function() {
            MyGame.m_context.drawImage(img, (MyScene.m_right - MyScene.m_left - img.width) / 2,
                (MyScene.m_bottom - MyScene.m_top - img.height) / 2);
        };
        this.m_gameState = "paused";
    },

    win: function() {
        console.log("wIN WIN WIN");
        var img = new Image();
        img.src = "images/control/win.png";

        this.tmpContext = MyGame.m_context;

        this.tmpContext.save();
        img.onload = function() {
            MyGame.m_context.drawImage(img, (MyScene.m_right - MyScene.m_left - img.width) / 2,
                (MyScene.m_bottom - MyScene.m_top - img.height) / 2);
        };

        this.m_gameState = "paused";
    },    

    playAgain: function() {
        console.log("PLAYAGAIN");
        this.m_gameState = "playing";
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// *** Lớp vẽ các đối tượng sinh vật biển ////////////////////////////////////////////////////////////////////////////////
// marine

var marines_source = [
    {
        src: "images/marines/fish_1_left.png",
        width: 100,
        height: 50,
        level: 1
    }, {
        src: "images/marines/fish_1_right.png",
        width: 100,
        height: 50,
        level: 1
    },

    {
        src: "images/marines/fish_2_left.png",
        width: 150,
        height: 75,
        level: 1
    }, {
        src: "images/marines/fish_2_right.png",
        width: 150,
        height: 75,
        level: 1
    },

    {
        src: "images/marines/fish_3_left.png",
        width: 175,
        height: 153,
        level: 2
    }, {
        src: "images/marines/fish_3_right.png",
        width: 175,
        height: 153,
        level: 2
    },
    {
        src: "images/marines/fish_4_left.png",
        width: 300,
        height: 120,
        level: 3
    }, {
        src: "images/marines/fish_4_right.png",
        width: 300,
        height: 120,
        level: 3
    },

    {
        src: "images/marines/star.png",
        width: 200,
        height: 213,
        level: 1
    }

];

var MyMarines = {
        m_marines_number: 8,
        m_arrayMarine: [],

        // Returns a random integer between min (included) and max (included)
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        addMarine: function() {

            let fish = {
                value: 0,
                top: 0,
                left: 0,
                width: 30,
                height: 30,
                src: 0,
                velocityX: -50,
                velocityY: 0,
                offsetX: 0,
                offsetY: 0,

                sate: "live", //Trạng thái cá "live" hoặc "die"
                level: 0, //Câp độ của cá trong game, dùng để xét cá bị ăn hay cá ăn cá nhỏ

                getCoord: function() { //Hàm trả vè tọa độ của sinh vật biển hiện tại
                    var Coord = [0, 0];
                    Coord[0] = this.left - this.offsetX + this.width / 2;
                    Coord[1] = this.top - this.offsetY + this.width / 2;
                    return Coord;
                }
            };

            //Đoạn này xuất cá theo tỉ lệ sao:ca1:ca2:ca3:ca4  1:13:12:4:1
            let preRand = this.getRandomInt(0, 30);
            var rand = 0;
            if (preRand == 0) {
                rand = 8;
            }

            if (preRand == 1) {
                rand = this.getRandomInt(6, 7);
            }

            if (preRand > 1 && preRand <= 5) {
                rand = this.getRandomInt(4, 5);
            }

            if (preRand > 5 && preRand <= 17) {
                rand = this.getRandomInt(2, 3);
            }
            if (preRand > 17) {
                rand = this.getRandomInt(0, 1);
            }



            //Phần khởi tạo các giá trị mặc định của mỗi loại cá
            fish.src = marines_source[rand].src;
            fish.state = "live";
            fish.level = marines_source[rand].level;

            if (rand == 8) {
                //console.log("Tao ngoi sao");
                fish.value = 0;
                fish.width = 100;
                fish.height = 100;
                fish.velocityX = 0;
                fish.velocityY = this.getRandomInt(-20, -10);
                fish.top = 0;
                fish.left = this.getRandomInt(MyScene.m_left + 30, MyScene.m_right - 30);

            } else {
                fish.value = Math.floor(rand / 2 + 1);

                fish.velocityY = 0;
                fish.width = marines_source[rand].width;
                fish.height = marines_source[rand].height;

                /* //Tùy mỗi loại cá thì có sẵn trong mảng luôn
                if (rand == 0 || rand == 1) {
                    fish.width = 100;
                    fish.height = 50;
                }
                if (rand == 2 || rand == 3) {
                    fish.width = 150;
                    fish.height = 75;
                }
                if (rand == 4 || rand == 5) {
                    fish.width = 200;
                    fish.height = 153;
                }
                if (rand == 6 || rand == 7) {
                    fish.width = 300;
                    fish.height = 120;
                }
                */

                if (rand % 2 == 0) {
                    //console.log("Tao ca PHAI");
                    fish.velocityX = this.getRandomInt(10, 80);
                    fish.top = this.getRandomInt(0, MyScene.getCanvasHeight());
                    fish.left = MyScene.getCanvasWidth() + MyScene.m_left;
                } else {
                    //console.log("Tao ca TRAI");
                    fish.velocityX = -this.getRandomInt(10, 80);
                    fish.top = this.getRandomInt(0, MyScene.getCanvasHeight());
                    fish.left = -fish.width;
                }

            }
            this.m_arrayMarine.push(fish);
        },

        setMarinesOffset: function() {
            for (var i = 0; i < this.m_arrayMarine.length; i++) {
                marine = this.m_arrayMarine[i];
                if (marine.state == "live") {
                    marine.offsetX += (MyScene.m_velocityX / MyGame.m_fps + marine.velocityX / MyGame.m_fps);
                    marine.offsetY += (MyScene.m_velocityY / MyGame.m_fps + marine.velocityY / MyGame.m_fps);

                    //Kiểm tra cá đến tường thì hủy cá
                    if (Math.abs(marine.offsetX) >= MyScene.getBackGroundWidth() || Math.abs(marine.offsetY) >= MyScene.getBackGroundHeight()) {
                        marine.state = "die";
                        //console.log("state="+ marine.state);
                    }
                    //console.log("ABC="+Math.abs(-100));
                }
            }
        },

        draw: function() {
            this.setMarinesOffset();

            for (var i = 0; i < this.m_arrayMarine.length; ++i) {
                marine = this.m_arrayMarine[i];

                if (marine.state == "live") {
                    img = new Image();
                    img.src = marine.src;
                    MyGame.m_context.save();
                    MyGame.m_context.translate(-marine.offsetX, -marine.offsetY);
                    MyGame.m_context.lineWidth = marine.width;
                    MyGame.m_context.fillStyle = 'rgb(200,200,80)';

                    // MyGame.m_context.strokeRect(marine.left, marine.top, marine.width, marine.height);
                    // MyGame.m_context.fillRect(marine.left, marine.top, marine.width, marine.height);
                    MyGame.m_context.drawImage(img, marine.left, marine.top, marine.width, marine.height);
                    //console.log('marine na', marine.left -marine.offsetX, marine.top -marine.offsetY);
                    MyGame.m_context.restore();
                }
            }
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// *** Lớp kiểm tra va chạm //

var Collision = {
    m_TimeToCheckFishDeadth: 500, //Thời gian lặp lại set interval để kiểm tra và loại cá chết ra khỏi mảng
    m_TimeToCheckCollision: 200, //Thời gian lặp lại set interval kiểm tra có va chạm

    //NHỮNG BIẾN DƯỚI ĐÂY BẠN kHANG COPY QUA KHI LÀM MYSCORE NHÉ
    m_Score: 0, //Điểm của cá
    m_Uplevel2Score: 20, //Số điểm để tăng cấp cá lần 1
    m_Uplevel3Score: 50, //Số điểm để tăng cấp cá lần 2
    m_FinishGameScore: 70, //Số điểm để kết thúc trò chơi
    m_CurrentLevel: 1, //Level hiện tại của cá
    m_Heart: 1000, //Số mạng của nhân vật

    checkUplevel: function() { //Kiểm tra nếu điểm

        if (this.m_CurrentLevel == 1 && this.m_Score >= this.m_Uplevel2Score) {
            //Tăng cấp 2
            MyFish.setLevel(2);
            MyProgressBar.m_value = MyProgressBar.m_max_value/3;
            console.log("CA TANG CAP 2");
        }


        if (this.m_CurrentLevel == 2 && this.m_Score >= this.m_Uplevel3Score) {
            //Tăng cấp 3
            MyFish.setLevel(3);
            MyProgressBar.m_value = MyProgressBar.m_max_value/3*2;
            console.log("CA TANG CAP 3");
        }


        if (this.m_CurrentLevel == 3 && this.m_Score >= this.m_FinishGameScore) {
            //Kết thúc game
            MyProgressBar.m_value = MyProgressBar.m_max_value;
            console.log("CHIEN THANG GAME");


            setTimeout(Controls.win(), 1000);
        }

        this.m_CurrentLevel = MyFish.getLevel();

    },

    resetScore: function() { //Nếu cá bị ăn và nhưng vẫn còn sống thì level đưa về mốc ban đầu của cột mốc hiện tại
        switch (this.m_CurrentLevel) {
            case 1:
                this.m_Score = 0;
                break;
            case 2:
                this.m_Score = this.m_Uplevel2Score;
                break;
            case 3:
                this.m_Score = this.m_Uplevel3Score;
                break;
        }
    },

    addHeart: function(value) { //Tăng hoặc giảm mạng của nhân vật 
        this.m_Heart += value;
        MyHeart.m_heart = this.m_Heart % 900;
    },

    addScore: function(value) { //Tăng điểm số
        this.m_Score += value;
        // MyScore.m_score = this.m_Score;
        MyScore.m_score = this.m_Score;
        this.checkUplevel(); //Kiểm tra có tăng level
        // consoleKhoa
        // console.log("HEART=" + this.m_Heart);
        console.log("SCORE=" + this.m_Score);
        // console.log("LEVEL=" + this.m_CurrentLevel);
    },

    init: function() {
        MyProgressBar.m_max_value = this.m_FinishGameScore;
    },

    start: function() {
        //console.log("canvaswidth="+MyScene.getCanvasWidth());
        //console.log("canvasleft="+MyScene.m_left);
        setInterval(function() {
            //Cứ mỗi x giây thì kiểm tra loại những cá bị chết ra khỏi mảng và thêm cá mới
            var stacktemp = [];
            for (var i = 0; i < MyMarines.m_arrayMarine.length; i++) {
                var marine = MyMarines.m_arrayMarine[i];
                if (marine.state == "live") {
                    stacktemp.push(marine);
                }
            }

            MyMarines.m_arrayMarine = stacktemp;

            if (MyMarines.m_arrayMarine.length <= 20) {
                MyMarines.addMarine();
            }
        }, this.m_TimeToCheckFishDeadth);

        //Kiểm tra đụng độ
        setInterval(function() {
            var MouseCoord = MyFish.getMouseCoord();
            //console.log("xcoord="+ MouseCoord[0]);
            //console.log("ycoord="+ MouseCoord[1]);

            for (var i = 0; i < MyMarines.m_arrayMarine.length; i++) {
                var marine = MyMarines.m_arrayMarine[i];

                if (marine.state == "live") {
                    var MouseDirection = MyFish.getDirection();
                    var deltaX = 1000;
                    var deltaY = 1000;

                    var MarineCoord = MyMarines.m_arrayMarine[i].getCoord();

                    distanceBetweenFishesX = MyFish.getWidth() + marine.width / 2;
                    distanceBetweenFishesY = MyFish.getWidth() / 2 + marine.height;


                    deltaX = Math.abs(MouseCoord[0] - MarineCoord[0]);
                    deltaY = Math.abs(MouseCoord[1] - MarineCoord[1]);
                    if (deltaX < distanceBetweenFishesX && deltaY < distanceBetweenFishesY) { //Có xảy ra đụng độ

                        var MarineLv = marine.level;
                        var MouseFishLv = MyFish.getLevel();

                        if (MouseFishLv >= MarineLv) {
                            console.log("CA LON NUOT CA BE");
                            marine.state = "die";
                            Collision.addScore(1);
                        } else {
                            console.log("BI CA NUOT");
                            Collision.addHeart(-1);
                        }


                    }

                    /*
                    if(MouseDirection == "left"){  //Nếu hướng sang trái thì chỉ ăn cá từ trái sang phải
                      //Lúc này tọa độ chuột lớn hơn tọa độ cá
                      deltaX = MouseCoord[0] - MarineCoord[0];
                      deltaY = Math.abs(MouseCoord[1] - MarineCoord[1])
                    }
                    if(MouseDirection == "right"){ //Nếu hướng sang phải thì chỉ ăn cá từ phải sang trái
                      //Lúc này tọa độ chuột nhỏ hơn tọa độ cá
                      deltaX = - MouseCoord[0] + MarineCoord[0];
                      deltaY = Math.abs(MouseCoord[1] - MarineCoord[1])
                    }


                    if(deltaX >= 0){ //Đúng chiều cá ăn được
                      if(deltaX <200 && deltaY < 200){ //50 sẽ thay bằng khoảng cách để ăn được cá
                        console.log("CA BI AN");
                        marine.state = "die";
                      }
                    }
                    */
                }
            }
        }, this.m_TimeToCheckCollision);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MyScore = {
    m_score: 0,
    m_lineWidth: 10,
    m_offsetX: 20,
    m_offsetY: 30,
    m_color: 'rgb(255,255,255)',

    draw: function() {

        MyGame.m_context.lineWidth = this.m_lineWidth;
        MyGame.m_context.fillStyle = this.m_color;

        MyGame.m_context.font = 'normal bold 2em courier';

        MyGame.m_context.fillText("Score: " + MyScore.m_score, this.m_offsetX, this.m_offsetY);
    }
};

var MyHeart = {
    m_heart: 0,
    m_lineWidth: 10,
    m_offsetX: 300,
    m_offsetY: 30,
    m_color: 'rgb(255,255,255)',

    draw: function() {

        MyGame.m_context.lineWidth = this.m_lineWidth;
        MyGame.m_context.fillStyle = this.m_color;

        MyGame.m_context.font = 'normal bold 2em courier';

        MyGame.m_context.fillText("Heart: " + this.m_heart, this.m_offsetX, this.m_offsetY);
    }
};

var MyProgressBar = {
    m_value: 50,
    m_max_value: 100,
    m_width: 500,
    m_height: 10,
    m_offsetX: 0,
    m_offsetY: 0,
    m_bg_color: 'rgb(0,0,0)',
    m_line_color: 'rgb(249,28,12)',
    m_value_color: 'rgb(226,226,42)',

    m_line1_offsetX: 0,
    m_line2_offsetX: 0, 


    init: function() {
        this.m_offsetX = MyScene.m_right - this.m_width - 180;
        this.m_offsetY = MyScene.m_top ;
        this.m_line1_offsetX = this.m_offsetX + this.m_width / 3;
        this.m_line2_offsetX = this.m_offsetX + this.m_width / 3 * 2;
    },

    draw: function() {
        MyGame.m_context.lineJoin = 'round';
        MyGame.m_context.lineCap = 'round';
        MyGame.m_context.fillStyle = this.m_bg_color;
        MyGame.m_context.fillRect(this.m_offsetX, this.m_offsetY, this.m_width, this.m_height);

        MyGame.m_context.fillStyle = this.m_value_color;
        MyGame.m_context.fillRect(this.m_offsetX, this.m_offsetY, this.m_value / this.m_max_value * this.m_width, this.m_height);

        MyGame.m_context.fillStyle = this.m_line_color;
        MyGame.m_context.fillRect(this.m_line1_offsetX, this.m_offsetY, 2, this.m_height);
        MyGame.m_context.fillRect(this.m_line2_offsetX, this.m_offsetY, 2, this.m_height);
    }
}

/// *** Lớp thực hiện chức năng chính trong game //////////////////////////////////////////////////////////////////////////
var MyGame = {

    m_lastAnimationFrameTime: 0,
    m_lastFpsUpdateTime: 0,
    m_fps: 60,

    init: function() {

        this.m_canvas = document.getElementById('game-canvas');
        this.m_context = this.m_canvas.getContext('2d');

        Controls.init();
        MyScene.init();
        MyFish.init();
        MyProgressBar.init();
        MyProgressBar.m_value = 0;
        Collision.init();

        MyScene.standScreen(); //Ban đầu màn hình đứng yên          
    },

    startGame: function() {
        window.requestNextAnimationFrame(this.animate);
        Collision.start();
    },

    draw: function() {

        if (Controls.isThisGamePlaying() == true) {
            MyScene.draw();
            MyMarines.draw();
            MyScore.draw();
            MyHeart.draw();
            MyProgressBar.draw();

        
        } else {
            Controls.drawPausedState();
        }

    },

    /////////////////////////////////////////////////////////
    calculateFps: function(now) {
        var fps = 1000 / (now - this.m_lastAnimationFrameTime);
        this.m_lastAnimationFrameTime = now;

        if (now - this.m_lastFpsUpdateTime > 1000) {
            this.m_lastFpsUpdateTime = now;
        }
        return fps;
    },

    animate: function(now) {
        MyGame.m_fps = MyGame.calculateFps(now);
        MyGame.draw();
        requestNextAnimationFrame(MyGame.animate);
    },
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////BAT/////DAU/////TRO/////CHOI//////////////////////////////////////////////////////////////////////////////////////////

MyGame.init();
MyGame.startGame();

/*
console.log("left canvas="+MyScene.m_left);
console.log("right canvas ="+MyScene.m_right);
console.log("top canvas ="+MyScene.m_top);
console.log("bottom canvas ="+MyScene.m_bottom);
console.log("canvas width =" + MyScene.getCanvasWidth());
console.log("canvas height =" + MyScene.getCanvasHeight());

console.log("right background ="+ (MyScene.getBackGroundWidth() + MyScene.m_left) );
console.log("bottom anh background ="+ (MyScene.getBackGroundHeight() + MyScene.m_top) );

////Phan sau co the thay thanh bat dung do

setInterval(function(){
var tempC = MyFish.getMouseCoord();
    console.log("xcoord="+ tempC[0]);
    console.log("ycoord="+ tempC[1]); 
},100);
*/


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *** Thay đổi con trỏ chuột bằng ảnh tĩnh
/*
  <script type="text/javascript">
    document.getElementsByTagName("body")[0].style.cursor = "url('http://mangvn.org/2005/anh/chuot/harlequin.cur'), auto";
  </script>
*/
/*
  var docwidth=document.all? MyFish.truebody().scrollLeft+MyFish.truebody().clientWidth : pageXOffset+window.innerWidth-15
  var docheight=document.all? Math.max(MyFish.truebody().scrollHeight, MyFish.truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight)
*/
