const canvas = document.querySelector(".cv");
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 300;

let nbArrow = document.getElementById("arr-left");
let divScore = document.getElementById("score");
let rbutton = document.getElementById("rbutton");
let maxScore = document.getElementById("max-score");

const spriteWidth = 64;
const spriteHeight = 64;
let playerFrame = 0;
const staggerFrames = 5;

let position = 0;
let player = null;
let enemies = [];

let sound = new Audio('./sounds/BeyondTheWarriors.mp3');
let casse = new Audio('./sounds/899.mp3');

sound.onended = function() {
    sound.currentTime = 0;
    sound.play();
}

let frameAnimationID = 0;

rbutton.addEventListener('click', () => {
    if (player.score > 0) {
        maxScore.innerHTML = "Max Score :" + player.score;
    } else {
        maxScore.innerHTML = "Max Score :0";
    }
    gamePlay.start();

});

var gamePlay = {

    level: 1,

    tuto: () => {
        firstWindow();
        window.addEventListener('click', firstclick);
    },

    start: () => {
        gamePlay.load();
        sound.play();
        nbArrow.innerHTML = "" + player.availableArrows;
        score.innerHTML = "" + player.score;

        window.addEventListener('keyup', (evt) => {
            gamePlay.keys[evt.key] = false;
            // put current animation back to standing in the good direction after movement
            switch (evt.key) {
                case "d":
                    if (!player.currentAnimation.includes("bowing")) {
                        player.currentAnimation = "standing-right";
                    }
                    break;
                case "z":
                case "w":
                    if (!player.currentAnimation.includes("bowing")) {
                        player.currentAnimation = "standing-up";
                    }
                    break;
                case "s":
                    if (!player.currentAnimation.includes("bowing")) {
                        player.currentAnimation = "standing-down";
                    }
                    break;
                case "q":
                case "a":
                    console.log("left");
                    if (!player.currentAnimation.includes("bowing")) {
                        player.currentAnimation = "standing-left";
                    }
                    break;
                case " ":
                    if (player.holdingShoot) {
                        setTimeout(player.throwArrow, 50);
                    } else {
                        setTimeout(player.throwArrow, 650);
                    }
                    setTimeout(player.shootingCooldown, 1300);
                    window.removeEventListener("keydown", cancelShoot);
                    window.addEventListener("keydown", handleKeyDown);
                    break;
            }
        });

        window.addEventListener('keydown', handleKeyDown);
    },

    checkState: () => {
        if (enemies.length === 0) {
            gamePlay.nextlevel();
        }
        nbArrow.innerHTML = "" + player.availableArrows;
        score.innerHTML = "" + player.score;

        if (player.availableArrows === 0) {
            window.cancelAnimationFrame(frameAnimationID);
            context.font = "50px serif";
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            context.fillText("MAX SCORE " + player.score, CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2);
        }
    },

    load: () => {
        player = new Player(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        enemies.splice(0, enemies.length);
        for (var i = 0; i < 10; i++) {
            enemies.push(new Enemies(Math.random() * (CANVAS_WIDTH - 30), Math.random() * (CANVAS_HEIGHT - 30), 0, 0));
        }
    },

    nextlevel: () => {
        gamePlay.level++;
        let movingEnemies = gamePlay.level;

        player.x = 0;
        player.y = 0;

        for (var i = 0; i < 10; i++) {
            if (movingEnemies > 0) {
                enemies.push(new Enemies(Math.random() * (CANVAS_WIDTH - 30), Math.random() * (CANVAS_HEIGHT - 100), true));
                movingEnemies--;
            } else {
                enemies.push(new Enemies(Math.random() * (CANVAS_WIDTH - 30), Math.random() * (CANVAS_HEIGHT - 100), false));
            }

        }
    },

    collide: (arr, e) => {
        if ((arr.x + arr.width >= e.x && arr.x + arr.width < e.x + 30) && arr.vx > 0) {
            if (arr.y + arr.height > e.y && arr.y < e.y + 25) {
                // collision from left
                // we remove the specific enemie
                arr.nbOfEnemyDown++;
                return 1;
            }
        } else if ((arr.x <= e.x + 30 && arr.x > e.x) && arr.vx < 0) {
            if (arr.y + arr.height > e.y && arr.y <= e.y + 25) {
                // collision from right
                // we remove the specific enemie
                arr.nbOfEnemyDown++;
                return 1;
            }
        } else if ((arr.y + arr.height >= e.y && arr.y + arr.height < e.y + 30) && arr.vy > 0) {
            if (arr.x + arr.width > e.x && arr.x < e.x + 30) {
                // collision from up
                // we remove the specific enemie
                arr.nbOfEnemyDown++;
                return 1;
            }
        } else if ((arr.y >= e.y && arr.y < e.y + 30) && arr.vy < 0) {
            if (arr.x + arr.width > e.x && arr.x < e.x + 30) {
                // collision from down
                // we remove the specific enemie
                arr.nbOfEnemyDown++;
                return 1;
            }
        }
    }

}

function firstclick(evt) {
    evt.preventDefault();
    gamePlay.start();
    animate();
    window.removeEventListener("click", firstclick);
}

function firstWindow() {
    context.fillText("Click anywhere to Start", CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * (4 / 5));
}

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (player.currentAnimation.includes("standing")) {
        // if player is standing, no need to increase sprite pos
        position = 0;
        playerFrame = 0;
    } else {
        position = Math.floor(playerFrame / staggerFrames) % player.spritesAnimations[player.currentAnimation].loc.length;
    }

    let frameX = spriteWidth * position;
    let frameY = player.spritesAnimations[player.currentAnimation].loc[position].y;

    context.drawImage(player.img, frameX, frameY,
        spriteWidth, spriteHeight, player.x, player.y, spriteWidth, spriteHeight);

    if (player.currentAnimation.includes("bowing")) {
        if (position >= player.spritesAnimations[player.currentAnimation].loc.length - 1) {
            // after bowing animation, sets back to standing 
            player.ArrowStrength = 0;
            player.currentAnimation = "standing" + player.currentAnimation.slice(6, player.currentAnimation.length);
            playerFrame++;
        } else
        if (position === 8) {
            //middle of bowing animation
            if (gamePlay.keys[' ']) {
                // player is holding space 
                player.holdingShoot = true;
            } else {
                player.holdingShoot = false;
                playerFrame++;
            }
        } else {
            playerFrame++;
        }
    } else {
        playerFrame++;
    }

    handleKeysActions();
    handleArrows();
    drawEnemies();
    gamePlay.checkState();
    player.update();
    checkCollision(player, enemies);
    frameAnimationID = window.requestAnimationFrame(animate);

}

function handleKeyDown(evt) {
    evt.preventDefault();
    gamePlay.keys = (gamePlay.keys || []);
    gamePlay.keys[evt.key] = true;
}

function cancelShoot(evt) {
    //not fininsh
    evt.preventDefault();
    gamePlay.keys['x'] = true;
    if (evt.key === "x") {
        player.cancelledShoot = true;
    }
}

function checkCollision(player, enemies) {
    player.arrowToThrow.forEach(arr => {
        enemies.forEach((e, index) => {
            if (gamePlay.collide(arr, e) == 1) {
                casse.play();
                enemies.splice(index, 1);
            }
        });
    })
}

function handleKeysActions() {
    if (gamePlay.keys && (gamePlay.keys["z"] || gamePlay.keys["w"])) {
        player.currentAnimation = "walking-up";
        player.vx = 0;
        player.vy = -2;
    } else
    if (gamePlay.keys && gamePlay.keys["d"]) {
        player.currentAnimation = "walking-right";
        player.vx = 2;
        player.vy = 0;
    } else
    if (gamePlay.keys && gamePlay.keys["s"]) {
        player.currentAnimation = "walking-down";
        player.vx = 0;
        player.vy = 2;
    } else
    if (gamePlay.keys && (gamePlay.keys["q"] || gamePlay.keys["a"])) {
        player.currentAnimation = "walking-left";
        player.vx = -2;
        player.vy = 0;
    } else
    if (gamePlay.keys && gamePlay.keys[" "]) {
        window.removeEventListener("keydown", handleKeyDown);
        window.addEventListener("keydown", cancelShoot);
        player.increaseArrowStrength();
        switch (player.currentAnimation) {
            case "walking-right", "standing-right":
                player.currentAnimation = "bowing-right";
                break;
            case "walking-down", "standing-down":
                player.currentAnimation = "bowing-down";
                break;
            case "walking-left", "standing-left":
                player.currentAnimation = "bowing-left";
                break;
            case "walking-up", "standing-up":
                player.currentAnimation = "bowing-up";
                break;
        }
    }
}

function handleArrows() {
    player.arrowToThrow.forEach(arrow => {
        context.drawImage(arrow.img, arrow.x, arrow.y, arrow.width, arrow.height);
        arrow.updatePos();
        if ((arrow.vx === 0 && arrow.vy === 0) || (arrow.x > CANVAS_WIDTH || arrow.x < 0 || arrow.y > CANVAS_HEIGHT || arrow.y < 0)) {
            //console.log(arrow.nbOfEnemyDown);
            if (arrow.nbOfEnemyDown === 1) {
                player.score += 2;
            } else if (arrow.nbOfEnemyDown === 2) {
                player.score += 3;
                player.availableArrows++;
            } else if (arrow.nbOfEnemyDown >= 3) {
                i = arrow.nbOfEnemyDown - 3;
                player.score = player.score + 5 + i;
                player.availableArrows = player.availableArrows + 2 + i;
            }
            player.availableArrows--;
            player.arrowToThrow.pop();
        };
    });

}

function drawEnemies() {
    enemies.forEach(enemie => {
        enemie.updatePos();
        context.drawImage(enemie.img, enemie.x, enemie.y, 30, 30);
    });
}

gamePlay.tuto();