class Weapon {
    constructor(shooter) {
        this.shooter = shooter
        this.bullets =  []

        this.tick = 0
    }

    shoot() {
        this.tick++

        if(this.tick >= 16) {
            this.bullets.push(
                new Bullet(
                    this.shooter.ctx,
                    this.shooter.x + this.shooter.w * 0.5,
                    this.shooter.y + this.shooter.h0 * 0.5,
                    this.shooter.actionId
                )
            )
            this.tick = 0
        }
        this.clearBullets()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(b => b.isVisible())
    }

    draw() {
        this.bullets.forEach(b => b.draw())
    }

    move() {
        this.bullets.forEach(b => b.move())
    }
}