class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.bg = new Background(ctx)
        this.character = new Character(ctx)
        
        this.img1 = new Image()
        this.img1.src = "./IMAGENES/Platform1.png"

        this.img2 = new Image()
        this.img2.src = "./IMAGENES/Platform2.png"

        this.img3 = new Image()
        this.img3.src = "./IMAGENES/Platform3.png"

        this.platform1 = new Platform(ctx, this.img1, 750, 450, 423, 72)
        this.platform2 = new Platform(ctx, this.img2, 200, 450, 258, 71)
        this.platform3 = new Platform(ctx, this.img3, 850, 230, 159, 67)
        this.platform4 = new Platform(ctx, this.img2, 400, 150, 258, 71)

        const platforms = []


        this.intervalId = 0

    }

    _runAnimationLoop() {
        this.intervalId = setInterval(() => {
          this.clear()
          this.draw()
          this.move()
          this.collisions()
          if (this.tick++ > 10000) {
            this.tick = 0
          }
        }, 1000 / 60)
      }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    draw() {
        this.bg.draw()

        this.platforms = [this.platform1, this.platform2, this.platform3, this.platform4]
        this.platforms.forEach(e => e.draw());

        this.character.draw()
        
    }

    move() {
        this.character.move()
    }

    collisions() {

        this.platforms.forEach(e => {
            if (this._checkCollisions()) {
                this.character.y0 = (e.y - e.img.height) + 20
            } else {
                this.character.y0 = 600
            }
        })
    }

    _checkCollisions() {

        this.platforms.forEach(e => {
            if (this.character.y + this.character.h0 <= e.y + e.img.height && this.character.vy >= 0 && this.character.x > e.x && this.character.x < e.x + e.w) {
                return true
            }
            return false
        })
    }
}