class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.bg = new Background(ctx)
        this.character1 = new Character(ctx, 0, "ch1")
        this.character2 = new Character(ctx, this.ctx.canvas.width, "ch2")
        
        this.img1 = new Image()
        this.img1.src = "./IMAGENES/Platform1.png"

        this.img2 = new Image()
        this.img2.src = "./IMAGENES/Platform2.png"

        this.img3 = new Image()
        this.img3.src = "./IMAGENES/Platform3.png"

        this.platform1 = new Platform(ctx, this.img1, 750, 450, 423, 72)
        this.platform2 = new Platform(ctx, this.img2, 200, 450, 258, 71)
        this.platform3 = new Platform(ctx, this.img3, 850, 280, 159, 67)
        this.platform4 = new Platform(ctx, this.img2, 400, 150, 258, 71)

        const platforms = []
        const characters = []

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

        this.platforms.reverse()
        this.platforms.forEach(e => e.draw());

        this.characters = [this.character1, this.character2]
        
        this.characters.forEach(e => e.draw())   
    }

    move() {
        this.characters.forEach(e => e.move())
    }

    collisions() {
        
        this.characters.forEach(c => {
            const platformColliding = this.platforms.find(e => this._checkCollisions(e, c))

            if (platformColliding) {
                c.y0 = platformColliding.y - platformColliding.img.height + 20
            } else {
                c.y0 = 600
            }
        })
    }

    _checkCollisions(e, c) {
        if (c.y + c.h0 <= e.y + e.img.height && c.vy >= 0 && c.x > e.x && c.x < e.x + e.w) {
            return true
        }
        return false

    }
}