function Player(x, y, CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this.score = 0;
    this.ArrowStrength = 0;

    this.isShooting = false;
    this.holdingShoot = false;
    this.cancelledShoot = false;
    this.arrowToThrow = [];
    this.availableArrows = 8;

    this.img = new Image();
    this.img.src = './assets/Zoe.png';

    this.currentAnimation = 'standing-right';
    this.finishedAnimation = true;

    let coup = new Audio('./sounds/c.wav');

    // Stocking animation frames and names
    this.spritesAnimations = [];
    this.animationStates = [{
            name: "standing-up",
            frameLen: 1,
            frameLine: 0
        },
        {
            name: "standing-left",
            frameLen: 1,
            frameLine: 1
        },
        {
            name: "standing-down",
            frameLen: 1,
            frameLine: 2
        },
        {
            name: "standing-right",
            frameLen: 1,
            frameLine: 3
        },
        {
            name: "spearing-up",
            frameLen: 7,
            frameLine: 4
        },
        {
            name: "spearing-left",
            frameLen: 7,
            frameLine: 5
        },
        {
            name: "spearing-down",
            frameLen: 7,
            frameLine: 6
        },
        {
            name: "spearing-right",
            frameLen: 7,
            frameLine: 7
        },
        {
            name: "walking-up",
            frameLen: 8,
            frameLine: 8
        },
        {
            name: "walking-left",
            frameLen: 8,
            frameLine: 9
        },
        {
            name: "walking-down",
            frameLen: 8,
            frameLine: 10
        },
        {
            name: "walking-right",
            frameLen: 8,
            frameLine: 11
        },
        {
            name: "bowing-up",
            frameLen: 13,
            frameLine: 16
        },
        {
            name: "bowing-left",
            frameLen: 13,
            frameLine: 17
        },
        {
            name: "bowing-down",
            frameLen: 13,
            frameLine: 18
        },
        {
            name: "bowing-right",
            frameLen: 13,
            frameLine: 19
        }

    ];
    this.animationStates.forEach((state) => {
        let frames = {
            loc: []
        }
        for (let j = 0; j < state.frameLen; j++) {
            let positionX = j * spriteWidth;
            let positionY = state.frameLine * spriteHeight;
            frames.loc.push({ x: positionX, y: positionY });
        }
        this.spritesAnimations[state.name] = frames;
    });

    this.shootingCooldown = () => {
        // autorize to shoot again
        this.isShooting = false;
    }

    this.throwArrow = () => {
        // adds an arrow o be thrown if player has available arrows and is not already shooting
        if (!this.isShooting && this.availableArrows > 0 && !this.cancelledShoot) {
            this.isShooting = true;
            var arrow;
            if (this.ArrowStrength > 15) {
                this.ArrowStrength = 15;
            } else if (this.ArrowStrength < 7) {
                player.ArrowStrength = 7;
            }

            if (this.currentAnimation.includes('right')) {
                arrow = new Projectile(this.x + 32, this.y + 32, this.ArrowStrength, 0, 30, 10, "./assets/arrow.png");
            } else if (this.currentAnimation.includes('left')) {
                arrow = new Projectile(this.x, this.y + 32, -this.ArrowStrength, 0, 30, 10, "./assets/arrow-left.png");
            } else if (this.currentAnimation.includes('down')) {
                arrow = new Projectile(this.x + 25, this.y + 32, 0, this.ArrowStrength, 10, 30, "./assets/arrow-down.png");
            } else if (this.currentAnimation.includes('up')) {
                arrow = new Projectile(this.x + 25, this.y, 0, -this.ArrowStrength, 10, 30, "./assets/arrow-up.png");
            }

            coup.play();

            this.ArrowStrength = 0;
            this.arrowToThrow.push(arrow);
        }
        this.cancelledShoot = false;
    }

    this.update = () => {
        // update player pos
        if (this.x >= CANVAS_WIDTH - 10) {
            this.x = -45;
        } else if (this.x < -45) {
            this.x = CANVAS_WIDTH - 10;
        } else if (this.y >= CANVAS_HEIGHT - 10) {
            this.y = -45;
        } else if (this.y < -45) {
            this.y = CANVAS_HEIGHT - 45;
        }
        this.x += this.vx;
        this.y += this.vy;

        if (this.vx > 1) {
            this.vx -= 0.1;
            this.vy = 0;
        } else if (this.vx < 0) {
            this.vx += 0.1;
            this.vy = 0;
        } else if (this.vx > 0 && this.vx < 1) {
            this.vx = 0;
        }

        if (this.vy > 1) {
            this.vx = 0;
            this.vy -= 0.1;
        } else if (this.vy < 0) {
            this.vx = 0;
            this.vy += 0.1;
        } else if (this.vy > 0 && this.vy < 1) {
            this.vy = 0;
        }

    }

    this.increaseArrowStrength = () => {
        this.ArrowStrength++;
    }
};