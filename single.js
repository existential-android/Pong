let gamemode = prompt("Elige un modo de juego:\n1. Un jugador \n2. Dos jugadores");
let IA;
setGamemode()
function setGamemode(){
    if (gamemode == "1") {
        console.log(gamemode)
        IA = true;
    } else if (gamemode == "2") {
        IA = false;
    } else {
        alert("Opción invalida, elige 1 o 2.")
        gamemode = prompt("Elige un modo de juego:\n1. Un jugador \n2. Dos jugadores");
        setGamemode();
    }
}

let IAlevel = 1;
let finalPositionX = -47;
let finalPositionY = 0;
let seguridad = 0;
let errorMargin = 0;
let reboteTest;
let strike;
let distance = -47;
function moveBot(x, y, z){
    console.log("oo")
    distance = -47;
    if(vY == 1.3) distance = -48;
    predictPosition(x,y,z);
    errorMargin = 70;
    if(errorMargin >= 0 && errorMargin < 50){
        if(errorMargin <= 25 && vY == 1.3) errorMargin = Math.random() * ((-5 - (rally/10) - vY) + 6 + 1) - 6;
        else if(errorMargin <= 25) errorMargin = Math.random() * ((-5 - (rally/10)) + 6 + 1) - 6;
        if(errorMargin > 25 && vY == 1.3) errorMargin = Math.random() * ((6 + (rally/10) + vY) - 5 + 1) + 5;
        else if(errorMargin > 25) errorMargin = Math.random() * ((6 + (rally/10)) - 5 + 1) + 5;
    }
    else if(errorMargin >= 50 && errorMargin < 75){
        if(errorMargin <= 63) errorMargin = Math.random() * (-2.5 + 5 + 1) - 5;
        if(errorMargin > 63) errorMargin = Math.random() * (5 - 2.5 + 1) + 2.5;
    }
    else if(errorMargin >= 50 && errorMargin < 100){
        strike = setInterval(() => {
            if (ballPositionX > -48){
                if(finalPositionY >= bar2Position){
                    if(finalPositionY - 12 >= bar2Position) bar2Position += 0.5; 
                    if(bar2Position >= 0 && bar2Position < 12) bar2Position += 0.5;
                } 
                if(finalPositionY < bar2Position){
                    if(finalPositionY + 12 <= bar2Position) bar2Position -= 0.5;
                    else if(bar2Position < 0 && bar2Position > -12) bar2Position -= 0.5; 
                }
                bar2.style.bottom = bar2Position + "vh";
            } 
            if (ballPositionX <= -48){
                if(finalPositionY >= bar2Position) bar2Position = finalPositionY - 5;
                if(finalPositionY < bar2Position) bar2Position = finalPositionY + 5;
                bar2.style.bottom = bar2Position + "vh";
                clearInterval(strike);
            } 
        }, 10)
        return
    }
    finalPositionY = finalPositionY + errorMargin
    startBarMovement2 = setInterval(() => {
        if(bar2Position <= 42.5 && bar2Position >= -42.5){
            if(finalPositionY >= bar2Position){
                bar2Position += 1;
                bar2.style.bottom = bar2Position + "vh";
            }
            if(finalPositionY <= bar2Position){
                bar2Position -= 1;
                bar2.style.bottom = bar2Position + "vh";
            }
        }
        if(bar2Position >= 42.5){
            bar2Position -= 1;
            bar2.style.bottom = bar2Position + "vh";
        }
        if(bar2Position <= -42.5){
            bar2Position += 1;
            bar2.style.bottom = bar2Position + "vh";
        }
    }, 10)
};
function predictPosition(x, y, z){
    finalPositionX = x;
    finalPositionY = y;
    reboteTest = z;
    if(finalPositionY >= 48 || finalPositionY <= -48) reboteTest = !reboteTest;
    if(reboteTest != undefined)
        while(finalPositionX >= distance){
            if(reboteTest == true){
                finalPositionY += vY;
            }
            else if(reboteTest == false){
                finalPositionY -= vY;
            }
            finalPositionX -= vX;
            if(finalPositionY >= 48 || finalPositionY <= -48){
                reboteTest = !reboteTest;
            }
        }
}