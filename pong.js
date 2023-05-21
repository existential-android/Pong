let background = document.getElementById("pong_background");
let ball = document.getElementById("ball");
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let score = document.getElementsByClassName("score");
let score1 = document.getElementsByClassName("score1");
let score2 = document.getElementsByClassName("score2");
let ballPositionX = 0;
let ballPositionY = 0;
let bar1Position = 0;
let up1 = undefined;
let up2 = undefined;
let bar2Position = 0;
let ballToPlayer = true;
let vY = 0;
let vX = .2;
let starMovement;
let startBarMovement1;
let startBarMovement2;
let rally = 0;
let points1 = 0;
let points2 = 0;
let rebote = undefined;
let sound = new Audio('PONG-SOUND.wav');
let goalSound = new Audio('LASER.wav');
movement();

function upOne(){
    clearInterval(startBarMovement1); 
    up1 = true;
    moveBar1(+1); 
}
function downOne(){
    clearInterval(startBarMovement1); 
    up1 = false;
    moveBar1(-1); 
}
function upTwo(){
    clearInterval(startBarMovement2); 
    up2 = true;
    moveBar2(+1); 
}
function downTwo(){
    clearInterval(startBarMovement2); 
    up2 = false;
    moveBar2(-1); 
}
document.addEventListener("keydown", e => {
    if(e.repeat) return;
    if(e.code == "KeyW" && up1 == undefined){upOne();}
    else if(e.code == "KeyS" && up1 == true){clearInterval(startBarMovement1); moveBar1(0); up1 = undefined;}
    else if(e.code == "KeyW" && up1 == false){clearInterval(startBarMovement1); moveBar1(0); up1 = undefined;}
    else if(e.code == "KeyS" && up1 == undefined){downOne();}
    if(e.code == "ArrowUp" && up2 == undefined){upTwo();}
    else if(e.code == "ArrowDown" && up2 == true){clearInterval(startBarMovement2); moveBar2(0); up2 = undefined;}
    else if(e.code == "ArrowUp" && up2 == false){clearInterval(startBarMovement2); moveBar2(0); up2 = undefined;}
    else if(e.code == "ArrowDown" && up2 == undefined){downTwo();}
})
document.addEventListener("keyup", e => {
    if(e.code == "KeyW"){
        clearInterval(startBarMovement1); 
        if(up1 == undefined){downOne();}; 
        if(up1 == true) up1 = undefined;
    }
    if(e.code == "KeyS"){
        clearInterval(startBarMovement1); 
        if(up1 == undefined){upOne();}; 
        if(up1 == false) up1 = undefined;
    }
    if(e.code == "ArrowUp"){
        clearInterval(startBarMovement2); 
        if(up2 == undefined){downTwo();}; 
        if(up2 == true) up2 = undefined;
    }
    if(e.code == "ArrowDown"){
        clearInterval(startBarMovement2); 
        if(up2 == undefined){upTwo();}; 
        if(up2 == false) up2 = undefined;
    }
})
function changeDirection(x){
    if(ballPositionY <= (x+7.5) && ballPositionY >= (x-7.5)){
        sound.play();
        ballToPlayer = !ballToPlayer;
        if(ballPositionY >= (x)) rebote = true;
        if(ballPositionY <= (x)) rebote = false;
        if(rally <= 30){rally++;}
        vX = (.4 + (rally/50));
        vY = .65;
        if(ballPositionY <= (x+5) && ballPositionY >= (x-5)) vY = .5;
        if(ballPositionY <= (x+2.5) && ballPositionY >= (x-2.5)) vY = .4;
        if(ballPositionY <= (x+.5) && ballPositionY >= (x-.5)) vY = .1;
        if(ballPositionY <= (x) && ballPositionY >= (x)) vY = 0;
        if(ballPositionX >= 48 || ballPositionX <= -48) vY = 1.3;
        if(IA == true && ballToPlayer == false) moveBot(ballPositionX, ballPositionY, rebote);
    }
}
function ballMovement(){
    if(ballToPlayer == true){
        ballPositionX += vX;
        reboteY()
        if(ballPositionX >= 50){
            points2 += 1; 
            changeScore(points2, 1);
            background.style.background = "linear-gradient(90deg, red 50%, black 50%)";
            ball.style.backgroundColor = "black";
            bar1.style.backgroundColor = "black";
            score[0].style.backgroundColor = "black";
            score1[0].style.backgroundColor = "red";
            score2[0].style.backgroundColor = "red";
            reset();
        }
        else if(ballPositionX >= 47) changeDirection(bar1Position);;
        ball.style.right = ballPositionX + "vw";
    }
    else if(ballToPlayer == false){
        ballPositionX -= vX;
        reboteY()
        if(ballPositionX <= -50){
            points1 += 1;
            changeScore(points1, 0);
            background.style.background = "linear-gradient(90deg, black 50%, red 50%)" ;
            ball.style.backgroundColor = "black";
            bar2.style.backgroundColor = "black";
            score[1].style.backgroundColor = "black";
            score1[1].style.backgroundColor = "red";
            score2[1].style.backgroundColor = "red";
            reset();
        }
        else if(ballPositionX <= -47){changeDirection(bar2Position)}
        ball.style.right = ballPositionX + "vw";
    }
}
function reboteY(){
    if(rebote == true){
        ballPositionY += vY;
        if(ballPositionY >= 48){rebote = !rebote}
        ball.style.bottom = ballPositionY + "vh";
    }
    else if(rebote == false){
        ballPositionY -= vY;
        if(ballPositionY <= -48){rebote = !rebote}
        ball.style.bottom = ballPositionY + "vh";
    }
}
function reset(){
    goalSound.play();
    ballPositionX = 0;
    ball.style.right = ballPositionX + "vw";
    ballPositionY = 0;
    ball.style.bottom = ballPositionY + "vh";
    rally = 0;
    vX = .2;
    vY = 0;
    clearInterval(starMovement);
    if(IA == true && ballToPlayer == false) moveBot(ballPositionX, ballPositionY, rebote);
    movement();
}
function movement(){
    if(points1 < 10 && points2 < 10){
        setTimeout(() => {
            starMovement = setInterval(ballMovement, 10);
            background.style.background = "black"; 
            ball.style.backgroundColor = "red";
            bar1.style.backgroundColor = "white";
            bar2.style.backgroundColor = "white";
            score[0].style.backgroundColor = "white";
            score[1].style.backgroundColor = "white";
            score1[0].style.backgroundColor = "black";
            score2[0].style.backgroundColor = "black";
            score1[1].style.backgroundColor = "black";
            score2[1].style.backgroundColor = "black";
        }, 1000);
    }
}
function moveBar1(y){
    startBarMovement1 = setInterval(() => {
        if(bar1Position <= 42.5 && bar1Position >= -42.5){
            bar1Position += y;
            bar1.style.bottom = bar1Position + "vh";
        }
        else if(bar1Position >= 42.5 && up1 == false){
            bar1Position += y;
            bar1.style.bottom = bar1Position + "vh";
        }
        else if(bar1Position <= -42.5 && up1 == true){
            bar1Position += y;
            bar1.style.bottom = bar1Position + "vh";
        }
    }, 10)
}
function moveBar2(y){
    startBarMovement2 = setInterval(() => {
        if(bar2Position <= 42.5 && bar2Position >= -42.5){
            bar2Position += y;
            bar2.style.bottom = bar2Position + "vh";
        }
        else if(bar2Position >= 42.5 && up2 == false){
            bar2Position += y;
            bar2.style.bottom = bar2Position + "vh";
        }
        else if(bar2Position <= -42.5 && up2 == true){
            bar2Position += y;
            bar2.style.bottom = bar2Position + "vh";
        }
    }, 10)
}
function changeScore(y, x){
    if(y == 1){
        score1[x].style.gridColumn = "1/2";
        score1[x].style.gridRow = "1/6";
        score2[x].style.gridColumn = "3/4";
        score2[x].style.gridRow = "1/6";
    }
    if(y == 2){
        score1[x].style.gridColumn = "1/3";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "2/4";
        score2[x].style.gridRow = "4/5";
    }
    if(y == 3){
        score1[x].style.gridColumn = "1/3";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "1/3";
        score2[x].style.gridRow = "4/5";
    }
    if(y == 4){
        score1[x].style.gridColumn = "2/3";
        score1[x].style.gridRow = "1/3";
        score2[x].style.gridColumn = "1/3";
        score2[x].style.gridRow = "4/x";
    }
    if(y == 5){
        score1[x].style.gridColumn = "2/4";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "1/3";
        score2[x].style.gridRow = "4/5";
    }
    if(y == 6){
        score1[x].style.gridColumn = "2/4";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "2/3";
        score2[x].style.gridRow = "4/5";
    }
    if(y == 7){
        score1[x].style.gridColumn = "1/3";
        score1[x].style.gridRow = "2/6";
        score2[x].style.gridColumn = "1/3";
        score2[x].style.gridRow = "2/6";
    }
    if(y == 8){
        score1[x].style.gridColumn = "2/3";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "2/3";
        score2[x].style.gridRow = "4/5";
    }
    if(y == 9){
        score1[x].style.gridColumn = "2/3";
        score1[x].style.gridRow = "2/3";
        score2[x].style.gridColumn = "1/3";
        score2[x].style.gridRow = "4/6";
    }
    if(y == 10){
        score1[x].style.gridColumn = "1/4";
        score1[x].style.gridRow = "1/6";
        score2[x].style.gridColumn = "1/4";
        score2[x].style.gridRow = "1/6";
    }
}