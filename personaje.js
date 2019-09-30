const TOP_KEY = 38
const DOWN_KEY = 40
const RIGHT_KEY = 39
const LEFT_KEY = 37
const SPACE_KEY = 32

class Personaje {
    constructor(ctx) {
        this.ctx = ctx


        this.y0 = 600
        this.y = this.y0
        this.x = 0
        this.h
        this.h0 = 80
        this.w = 80
    
        this.vy = 0
        this.vx = 0
        this.ay = 0.8

        this.img = new Image()
        this.img.src = "./IMAGENES/Sprite1.png"

        this.img2 = new Image()
        this.img2.src = "./IMAGENES/Sprite2.png"

        this.img.frames = 6
        this.img.frameIndex = 0

        this.tick = 0
        
        this.actions = {
            right: false,
            left: false,
            space: false
        }

        this._setListeners()

        this.actionId = false
    }

    draw() {
    

        if (this.actions.left) {
            this.actionId = false
            console.log(this.actionId + " if left")
        } else if (this.actions.right) {
            this.actionId = true
            console.log(this.actionId + " if right")
        } 
        
        if (this.actions.right && !this.actions.left) {
            this.ctx.drawImage(
                this.img,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img.width / this.img.frames,
                this.img.height,
                this.x,
                this.y,
                this.w,
                this.h0
            )
        } else if (this.actions.left && !this.actions.right) {
            this.ctx.drawImage(
                this.img2,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img2.width / this.img.frames,
                this.img2.height,
                this.x,
                this.y,
                this.w,
                this.h0
            )
    
        } else if (this.actionId) {
            // console.log(actionId)
            this.ctx.drawImage(
                this.img,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img.width / this.img.frames,
                this.img.height,
                this.x,
                this.y,
                this.w,
                this.h0
            ) 
        } else if (!this.actionId){
            // console.log(actionId)
            this.ctx.drawImage(
                this.img2,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img2.width / this.img.frames,
                this.img2.height,
                this.x,
                this.y,
                this.w,
                this.h0
            ) 
        }

        this._animate()
    }

    move() {
        this.x += this.vx
        
        if (this.y < this.y0){
            this.vy += this.ay
            this.y += this.vy
        } else {
            this.vy = 0
        }
        
        this._applyActions()
    }

    _animate() {
    
        this.tick++

        if (this._run()){
            if (this.tick >= 5) {
                this.tick = 0
    
                if (!this._isJumping()) {
                    this.img.frameIndex++
                }
            }
            
            if (this.img.frameIndex >= this.img.frames) {
              this.img.frameIndex = 0
            } 
        } else {
            this.img.frameIndex = 1
        }

    }


    _setListeners() {
        document.onkeydown = (e) => this._switchAction(e.keyCode, true)
        document.onkeyup = (e) => this._switchAction(e.keyCode, false)
    }

    _applyActions() {
        
        if (this.actions.right) {
            this.vx = 5

        } else if (this.actions.left) {
            this.vx = -5
        } else {
            this.vx = 0
        }

        if (this.actions.space) {
            this._jump()
        }
    }

    _switchAction(key, apply) {

        switch (key) {
            case LEFT_KEY:
                this.actions.left = apply
            break;
                
            case RIGHT_KEY:
                this.actions.right = apply
                
            break;
    
            case SPACE_KEY:
                this.actions.space = apply
            break;
        }
    }

    _run() {
        if(this.actions.right || this.actions.left) {
            return true
        }
    }

    _jump() {
        if (!this._isJumping()) {
          this.img.frameIndex = 3
          this.y -= 10
          this.vy -= 15
        }
    }

    _isJumping() {
        return this.y < this.y0
      }
}