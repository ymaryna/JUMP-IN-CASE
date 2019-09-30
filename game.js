class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.bg = new Background(ctx)
        this.pj = new Personaje(ctx)
        this.intervalId = 0
    }

    run() {
        this.intervalId = setInterval(() => {
            this.clear()
            this.draw()
            this.move()
          }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    draw() {
        this.bg.draw()
        this.pj.draw()
    }

    move() {
        this.pj.move()
    }
}