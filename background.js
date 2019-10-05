class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height

        this.img = new Image()
        this.img.src = "./IMAGENES/2844946-the-elder-scrolls-v-skyrim-video-games-clouds-aurorae-sky-mountain___game-wallpapers.jpg"

    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {

    }
}