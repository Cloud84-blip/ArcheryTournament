function Projectile(x, y, vx, vy, width, height, src) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = src;

    this.nbOfEnemyDown = 0;

    this.updatePos = () => {
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
}