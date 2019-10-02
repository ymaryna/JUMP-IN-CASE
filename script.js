const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)


window.onload = function() {
    game._runAnimationLoop()

  // document.getElementById("start-button").onclick = function() {
  //   startGame();
  // };

  // function startGame() {
  //   game.run()

  // }
}