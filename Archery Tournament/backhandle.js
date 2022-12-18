/*
        this.handleKeyUp = (evt) => {
            this.moving = false;
            if (evt.key === "ArrowRight" || evt.key === "d") {
                this.currentAnimation = "standing-right";
            } else if (evt.key === "ArrowLeft" || evt.key === "q") {
                this.currentAnimation = "standing-left";
            } else if (evt.key === "ArrowUp" || evt.key === "z") {
                this.currentAnimation = "standing-up";
            } else if (evt.key === "ArrowDown" || evt.key === "s") {
                this.currentAnimation = "standing-down";
            }
        }

        this.handleKeyDown = (evt) => {
            this.finishedAnimation = false;
            if (evt.key === "ArrowRight" || evt.key === "d") {
                this.currentAnimation = "walking-right";
                this.vx = 2;
                this.vy = 0;
            } else if (evt.key === "ArrowLeft" || evt.key === "q") {
                this.currentAnimation = "walking-left";
                this.vx = -2;
                this.vy = 0;
            } else if (evt.key === "ArrowUp" || evt.key === "z") {
                this.currentAnimation = "walking-up";
                this.vy = -2;
                this.vx = 0;
            } else if (evt.key === "ArrowDown" || evt.key === "s") {
                this.currentAnimation = "walking-down";
                this.vy = 2;
                this.vx = 0;
            } else if (evt.key === ' ') {
                switch (this.currentAnimation) {
                    case "walking-right", "standing-right":
                        this.currentAnimation = "bowing-right";
                        break;
                    case "walking-down", "standing-down":
                        this.currentAnimation = "bowing-down";
                        break;
                    case "walking-left", "standing-left":
                        this.currentAnimation = "bowing-left";
                        break;
                    case "walking-up", "standing-up":
                        this.currentAnimation = "bowing-up";
                        break;
                }
                this.vx = 0;
                this.vy = 0;
                setTimeout(this.throwArrow, 650);
                setTimeout(this.shootingCooldown, 1300);
            } else {
                this.vy = 0;
                this.vx = 0;
            }
        }
        */