function Enemies(x, y, isMoving) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.isMoving = isMoving;

    this.img = new Image();
    this.img.src = "./assets/balloon.png";

    this.updatePos = () => {
        if (this.isMoving) {
            this.y += Math.sin(this.angle) * Math.random() * 3;
            this.angle += 0.1;
        }
    };
}