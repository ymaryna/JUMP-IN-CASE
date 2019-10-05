const TOP_KEY = 38
const DOWN_KEY = 40
const RIGHT_KEY = 39
const LEFT_KEY = 37
const W_KEY = 87
const S_KEY = 83
const A_KEY = 65
const D_KEY = 68

class Character {
    constructor(ctx, x, ch) {
        this.ctx = ctx
        this.ch = ch

        this.y0 = 600
        this.y = this.y0
        this.x = x
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
            up: false,
            shoot: false,
            space: false
        }

        this.weapon = new Weapon(this)

        this._setListeners()

        this.actionId = false
    }


    _getImgToDraw() {
        if ((this.actions.right && !this.actions.left) || this.actionId) {
          return this.img
        } else if ((this.actions.left && !this.actions.right) || !this.actionId) {
          return this.img2
        }
    }

    draw() {

        if (this.actions.left) {
            this.actionId = false
        } else if (this.actions.right) {
            this.actionId = true
        } 
        
        this.ctx.drawImage(
            this._getImgToDraw(),
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h0
        )
        
        this._animate()
        
        this.weapon.draw()
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


        if (this.y <= 0) {
            this.y = 0
            this.vy = 0
        } else if (this.x <= 0) {
            this.x = 0
        } else if (this.x + this.w >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w
        }

        this.weapon.move()
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
        document.addEventListener('keydown', (e) => this._switchAction(e.keyCode, true))
        document.addEventListener('keyup', e => this._switchAction(e.keyCode, false))
    }

    _applyActions() {
        
        if (this.actions.right) {
            this.vx = 5

        } else if (this.actions.left) {
            this.vx = -5
        } else {
            this.vx = 0
        }

        if (this.actions.up) {
            this._jump()
        }

        if (this.actions.shoot) {
            this.weapon.shoot()
          }
    }

    _switchAction(key, apply) {

        if (this.ch === "ch1"){
            switch (key) {
                case A_KEY:
                    this.actions.left = apply
                    if (apply) {
                        this.actions.right = false
                    }
                break;
                    
                case D_KEY:
                    this.actions.right = apply
                    if (apply) {
                        this.actions.left = false
                    }
                    
                break;
        
                case W_KEY:
                    this.actions.up = apply
                break;
    
                case S_KEY:
                    this.actions.shoot = apply
            }
        }

        if(this.ch === "ch2") {
            switch (key) {
                case LEFT_KEY:
                    this.actions.left = apply
                    if (apply) {
                        this.actions.right = false
                    }
                break;
                    
                case RIGHT_KEY:
                    this.actions.right = apply
                    if (apply) {
                        this.actions.left = false
                    }
                    
                break;
        
                case TOP_KEY:
                    this.actions.up = apply
                break;
    
                case DOWN_KEY:
                    this.actions.shoot = apply
            }
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
          this.y -= 15
          this.vy -= 20

        }
    }

    _isJumping() {
        return this.y < this.y0
      }
}