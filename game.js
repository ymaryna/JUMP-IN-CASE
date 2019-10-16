
class Game {
    constructor(ctx) {
        this.ctx = ctx
        // this.state = state

        this.bg = new Background(ctx,)
        this.character1 = new Character(ctx, 0, "ch1", "./IMAGENES/RUN_RIGHT_RED.png", "./IMAGENES/RUN_LEFT_RED.png")
        this.character2 = new Character(ctx, this.ctx.canvas.width, "ch2", "./IMAGENES/RUN_RIGHT_PURPLE.png", "./IMAGENES/RUN_LEFT_PURPLE.png")
        
        this.img1 = new Image()
        this.img1.src = "./IMAGENES/Platform1.png"

        this.img2 = new Image()
        this.img2.src = "./IMAGENES/Platform2.png"

        this.img3 = new Image()
        this.img3.src = "./IMAGENES/Platform3.png"

        this.readyImg = new Image()
        this.readyImg.src = "./IMAGENES/START.png"

        this.winnerImgRed = new Image()
        this.winnerImgRed.src = "./IMAGENES/WINNER_RED.png"

        this.winnerImgPurple = new Image()
        this.winnerImgPurple.src = "./IMAGENES/WINNER_PURPLE.png"

        this.platform1 = new Platform(ctx, this.img1, 450, 450, 450, 86)
        this.platform2 = new Platform(ctx, this.img2, 800, 200, 300, 81)
        this.platform3 = new Platform(ctx, this.img3, 230, 200, 215, 100)

        const platforms = []
        const characters = []

        this.intervalId = 0

        this.gameAudio = new Audio("./SOUNDS/GAMEAUDIO.mp3");
        this.victoryAudio = new Audio("./SOUNDS/VICTORYAUDIO.mp3")
        this.hitSound = new Audio("./SOUNDS/DAMAGE.mp3")
    }

    _runAnimationLoop() {
        this.gameAudio.volume = 0.1
        this.gameAudio.play()
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

        this.platforms = [this.platform1, this.platform2, this.platform3]

        this.platforms.reverse()
        this.platforms.forEach(e => e.draw());

        this.characters = [this.character1, this.character2]
        
        this.characters.forEach(e => e.draw())
    }

    move() {
        this.bg.move()
        this.characters.forEach(e => e.move())
    }

    collisions() {
        
        this.characters.forEach((c, i) => {
            const enemy = this.characters[i === 0 ? 1 : 0]
            const platformColliding = this.platforms.find(p => this._checkCollisions(p, c))
            
            if (enemy.health <= 0) {
                this._gameOver()
                // this.state.current = this.state.gameOver   
            }

            const bulletColliding = c.weapon.bullets.find(b => this._checkBulletsCollision(b, enemy))
            // console.log(bulletColliding)
            
            if (platformColliding) {
                c.y0 = platformColliding.y - 50
            } else {
                c.y0 = 620
            }

            if (bulletColliding) {
                this.hitSound.play()
                enemy._health()
                c.weapon.bullets = c.weapon.bullets.filter(bullet => bullet !== bulletColliding);
            }
        })
    }

    _checkCollisions(e, c) {

        if (c.y + c.h <= e.y + e.img.height && c.vy >= 0 && c.x > e.x && c.x < e.x + e.w) {
            return true
        }
        return false

    }

    _checkBulletsCollision(b, c) {
        if (
            (
                ((b.x < c.x + c.w && b.x > c.x) || (b.x + b.w > c.x && b.x + b.w < c.x + c.w)) // horizontal
                 && (b.y + b.h > c.y && b.y < c.y + c.h)/*|| (b.x < c.y && b.y + b.h < c.y + c.h))*/ //vertical
            )
        ) {
            return true
        }
        return false
    }

    _getReady() {
        this.ctx.drawImage(
            this.readyImg,
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }

    _gameOver() {
        this.gameAudio.pause()
        this.victoryAudio.play()
        if(this.character1.health > 0) {
            this.ctx.drawImage(
                this.winnerImgRed,
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            )
        } else {
            this.ctx.drawImage(
                this.winnerImgPurple,
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            )
        }
        clearInterval(this.intervalId)

        this.ctx.canvas.addEventListener("click", function(){
            location.reload()
        })
    }
}