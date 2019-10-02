class Platform {
    constructor(ctx, img, x, y, w, h) {
        this.ctx = ctx
        this.img = img
        this.x = x
        this.y = y
        this.w = w
        this.h = h

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