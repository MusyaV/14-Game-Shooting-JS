let STEP = 10;
let gameBoard = document.querySelector('#gameBoard');
let targetDIV = document.querySelector('#target');
let shooterDIV = document.querySelector('#shooter');
let btn_5 = document.querySelector('#btn_5');
let btn_8 = document.querySelector('#btn_8');
let points = document.querySelector('#points');
window.addEventListener('keydown', event => {
    // shooter left
    let xLeft = event.key;
    if (xLeft == 'ArrowLeft') {
        let shooterX = parseInt(window.getComputedStyle(shooterDIV).left);
        if (shooterX > 0) {
            let newX = (shooterX - STEP) + 'px';
            shooterDIV.style.left = newX;
        }
    }
    // shooter right
    let xRight = event.key;
    if (xRight == 'ArrowRight') {
        let shooterX = parseInt(window.getComputedStyle(shooterDIV).left);
        if (shooterX < 470) {
            let newX = (shooterX + STEP) + 'px';
            shooterDIV.style.left = newX;
        }
    }
    // shooter up
    let up = event.key;
    if (up == "ArrowUp") {
        let bombDIV = document.createElement('div');
        bombDIV.setAttribute('class', 'bomb');
        gameBoard.appendChild(bombDIV);
        let shooterX = parseInt(window.getComputedStyle(shooterDIV).left);
        let newX = (shooterX + 9) + "px";
        bombDIV.style.left = newX;
        let myInterval = setInterval(() => {
            let bombY = parseInt(window.getComputedStyle(bombDIV).top);
            let bombX = parseInt(window.getComputedStyle(bombDIV).left);
            let targetX = parseInt(window.getComputedStyle(targetDIV).left);
            let rightBomb = bombX + 9;
            let rightTarget = targetX + 100;
            if (bombY == -134) {
                clearInterval(myInterval);
                bombDIV.remove()
            } else {
                let newY = (bombY - STEP) + "px";
                bombDIV.style.top = newY;
                if (bombY == -34) {
                    if (rightBomb > targetX && bombX < rightTarget) {
                        bombDIV.remove()
                        let explosion = document.createElement('div');
                        explosion.setAttribute('class', 'explosion');
                        gameBoard.appendChild(explosion);
                        explosion.style.left = (bombX - 11) + "px";
                        explosion.style.top = '-54px';
                        let pointsNext = parseInt(points.innerHTML) + STEP
                        points.innerHTML = pointsNext
                        setTimeout(() => {
                            explosion.remove();
                        }, 100)
                    }
                }
            };

        }, 50);
    }
})
btn_5.addEventListener('click', infinity);
function infinity() {
    let targetX = parseInt(window.getComputedStyle(targetDIV).left);
    if (targetX == 0) {
        let myIntervalRight = setInterval(() => {
            let targetX = parseInt(window.getComputedStyle(targetDIV).left);
            if (targetX == 400) {
                clearInterval(myIntervalRight);
                infinity()
            } else {
                let newX = (targetX + STEP) + "px";
                targetDIV.style.left = newX;
            }
        }, 200)
    }
    if (targetX == 400) {
        let myIntervalLeft = setInterval(() => {
            let targetX = parseInt(window.getComputedStyle(targetDIV).left);
            if (targetX == 0) {
                clearInterval(myIntervalLeft);
                infinity()
            } else {
                let newX = (targetX - STEP) + "px";
                targetDIV.style.left = newX;
            }
        }, 200)
    }
}
btn_8.addEventListener('click', () => {
    window.location.reload()
})