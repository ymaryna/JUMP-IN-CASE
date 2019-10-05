class Bullet {
    constructor(ctx, x, y, id) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.id = id

        this.img = new Image()
        this.img.src ="./IMAGENES/laserBullet.png"

        this.vx = 50
        this.vy = 0
        this.ay = 0.1
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            25,
            13
          )
    }

    move() {
        if (this.id) {
            this.x += this.vx
            this.vy += this.ay
            this.y += this.vy
        } else {
            this.x -= this.vx
            this.vy -= this.ay
            this.y -= this.vy
        }
    }

    isVisible() {
        return !(
          this.x >= this.ctx.canvas.width || this.y >= this.ctx.canvas.height
        )
    }
}