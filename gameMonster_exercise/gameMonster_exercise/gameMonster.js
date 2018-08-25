var control = document.getElementById("control");
var playround = document.getElementById("playround");
var controlContext = control.getContext("2d");
var playroundContext = playround.getContext("2d");

var score = 40;
var speed = 1;
var monsterRandomNum = 1;
var hearts = 4;
var boomNum = 3;
var stopNum = 3;
var monsters = [];
var bloodLive = 200;
var mousePosX = -1;
var mousePosY = -1;
var showBlood = false;
var blood;
var level = 1;
var timeLive = 200;
//Set images for game
var monsterImage = new Image();
monsterImage.onload = function() {};
monsterImage.src = "images/monster.png";

var backgroundImage = new Image();
backgroundImage.onload = function() {};
backgroundImage.src = "images/background.png";

var heartImage = new Image();
heartImage.onload = function() {};
heartImage.src = "images/heart.png";

var bloodImage = new Image();
bloodImage.onload = function() {};
bloodImage.src = "images/blood.png";

var boomImage = new Image();
boomImage.onload = function() {};
boomImage.src = "images/boom.gif";

var pauseImage = new Image();
pauseImage.onload = function() {};
pauseImage.src = "images/pause.png";

var restartImage = new Image();
restartImage.onload = function() {};
restartImage.src = "images/restart.png";

var stopImage = new Image();
stopImage.onload = function() {};
stopImage.src = "images/stop.png";

function Monster(beginX, beginY, endX, endY, startX, startY, stopX, stopY, speed, click, show, dieX, dieY) {
    this.beginX = beginX;
    this.beginY = beginY;
    this.endX = endX;
    this.endY = endY;
    this.startX = startX;
    this.startY = startY;
    this.speedX = speed;
    this.speedY = speed;
    this.stopX = stopX;
    this.stopY = stopY;
    this.positionX = startX;
    this.positionY = startY;
    this.speed = speed;
    this.click = click;
    this.show = show;
    this.dieX = dieX;
    this.dieY = dieY;
    this.isKilled = false;
}
//Create game's monster
var monster1 = new Monster(50, 50, playround.width - 70, playround.height - 70, 50, 50, playround.width - 70, playround.height - 70, speed, false, true, 0, 0);
monsters.push(monster1);
var monster2 = new Monster(0, 80, playround.width - 70, playround.height - 70, 0, 80, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster2);
var monster3 = new Monster(0, 200, playround.width - 70, playround.height - 70, 0, 200, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster3);
var monster4 = new Monster(80, 220, playround.width - 70, playround.height - 70, 80, 220, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster4);
var monster5 = new Monster(400, 250, playround.width - 70, playround.height - 70, 400, 250, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster5);
var monster6 = new Monster(400, 0, playround.width - 70, playround.height - 70, 400, 0, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster6);
var monster7 = new Monster(0, 180, playround.width - 70, playround.height - 70, 0, 180, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster7);
var monster8 = new Monster(120, 0, playround.width - 70, playround.height - 70, 120, 0, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster8);
var randomPosition = Math.floor(Math.random() * 400 + 1);
var monster9 = new Monster(randomPosition, randomPosition, playround.width - 70, playround.height - 70, randomPosition, randomPosition, playround.width - 70, playround.height - 70, speed, false, false, 0, 0);
monsters.push(monster9);

Monster.prototype.draw = function(startX, startY) {
    playroundContext.drawImage(monsterImage, startX, startY, 80, 80);
}

Monster.prototype.move = function() {

    this.startX += this.speedX;
    this.startY += this.speedY;
    if (this.startX > this.stopX || this.startX < this.positionX) {
        this.speedX *= -1;
    }

    if (this.startY > this.stopY || this.startY < this.positionY) {
        this.speedY *= -1;
    }

    timeLive--;
    if (timeLive == 0) {
        this.refreshMonster;
        score -= 10;
        chooseRandom();
    }

}

Monster.prototype.refreshMonster = function() {
    this.startX = this.beginX;
    this.startY = this.beginY;
    /*this.stopX = this.endX;
    this.stopY = this.endY;*/
    this.speedX = this.speedY = speed;
    this.isKilled = false;
    this.show = false;
    timeLive = 200;
}

Monster.prototype.kill = function(positionX, positionY) {
        if ((positionX > this.startX && positionX < this.startX + 30) || (positionY > this.startY && positionY < this.startY + 30)) {
            console.log("Click monster " + checkMonsterPos);
            //this.isKilled = true;
            this.show = false;
            mousePosX = positionX;
            mousePosY = positionY;
            showBlood = true;
            //this.speedX = this.speedY = 0;
            score += 10;
            //changeLevel();
            //this.addBlood(this.startX, this.startY);
            timeLive -= 50;

        }
    }
    /*Monster.prototype.addBlood = function(positionX, positionY) {
        console.log("Blood!!");
        playroundContext.drawImage(bloodImage, positionX, positionY);
    }*/
function addBlood(posX, posY) {
    if (bloodLive > 0) {
        playroundContext.drawImage(bloodImage, posX, posY, 80, 80);
    }
    if (bloodLive == 0) {
        bloodLive = 200;
        showBlood = false;
    }
}

function drawImage() {
    controlContext.clearRect(0, 0, control.width, control.height);
    playroundContext.drawImage(backgroundImage, 0, 0, playround.width, playround.height);
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            monsters[i].draw(monsters[i].startX, monsters[i].startY);
        }
    }

    controlContext.fillStyle = "green";
    controlContext.font = "20px Arial";
    controlContext.fillText("Score: " + score, 10, 20);
    controlContext.fillText("Heart: ", 10, 50);
    controlContext.fillText("Speed: " + speed, 10, 80);
    controlContext.fillText("Random monster: " + monsterRandomNum, 300, 20);
    var amount = 0;
    for (var i = 0; i < hearts; i++) {
        controlContext.drawImage(heartImage, 70 + amount, 35, 20, 20);
        amount += 20;
    }
    controlContext.drawImage(restartImage, 445, 70, 30, 30);
    controlContext.drawImage(pauseImage, 400, 70, 30, 30);
    controlContext.drawImage(stopImage, 350, 70, 30, 30);
    controlContext.drawImage(boomImage, 300, 70, 30, 30);
    controlContext.fillText(boomNum, 310, 68);
    controlContext.fillText(stopNum, 360, 68);
}

function chooseRandom() {
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            monsters[i].refreshMonster();
        }
    }
    for (var i = 3; i > 0; i--) {
        var random = Math.floor((Math.random() * 8 + 1));
        monsters[random].show = true;
    }
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function changeLevel() {
    if (score == 300) {
        level = 2;
        speed++;
        monsterRandomNum++;
    }
    if (score == 600) {
        level = 3;
        speed++;
        monsterRandomNum++;
    }
    if (score == 900) {
        level = 4;
        speed++;
        monsterRandomNum++;
    }
    if (score = 1200) {
        level = 5;
        speed++;
        monsterRandomNum++;
    }
}
var checkMonsterPos;
playround.addEventListener("click", function(event) {
    mousePos = getMousePos(playround, event);
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            checkMonsterPos = i;
            monsters[i].kill(mousePos.x, mousePos.y);
        }
    }
});


function main() {
    drawImage();
    var count = 0;
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].show) {
            console.log("main: " + i);
            count++;
            monsters[i].move();
        }
    }
    if (count == 0) {
        chooseRandom();
    }
    if (mousePosX != -1 && mousePosY != -1 && showBlood == true) {
        addBlood(mousePosX, mousePosY);
    }
    requestAnimationFrame(main);
}

requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
requestAnimationFrame(main);