class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height

        this.background = new Image()
        this.background.src = "./IMAGENES/BACKGROUND.png"

        this.sky = new Image()
        this.sky.src = "./IMAGENES/BACKGROUND_SKY.png"

        this.clouds = new Image()
        this.clouds.src = "./IMAGENES/CLOUDS.png"

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
            this.x,
            this.y,
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
    }

    move() {

    }
}