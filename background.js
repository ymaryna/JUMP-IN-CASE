class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.c1x = 0
        this.c1y = 0
        this.c2x = 0
        this.c2y = 0

        this.c1vx = -0.5
        this.c2vx = -1

        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height

        this.tick = 0

        this.background = new Image()
        this.background.src = "./IMAGENES/BACKGROUND.png"

        this.sky = new Image()
        this.sky.src = "./IMAGENES/BACKGROUND_SKY.png"

        this.clouds = new Image()
        this.clouds.src = "./IMAGENES/CLOUDS.png"

        this.clouds2 = new Image()
        this.clouds2.src = "./IMAGENES/CLOUDS2.png"

    }

    draw() {

        this.ctx.drawImage(
            this.sky,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.clouds,
            this.c1x,
            this.c1y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.clouds,
            this.c1x + this.w,
            this.c1y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.clouds2,
            this.c2x,
            this.c2y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.clouds2,
            this.c2x + this.w,
            this.c2y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.background,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.tick++
        if (this.tick >= 1000) {
          this.vx -= 1
          this.tick = 0
        } 
    }

    move() {
        this.c1x += this.c1vx

        if (this.c1x + this.w <= 0) {
            this.c1x = 0
        } 

        this.c2x += this.c2vx

        if (this.c2x + this.w <= 0) {
            this.c2x = 0
        } 
    }
}