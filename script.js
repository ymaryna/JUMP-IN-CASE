const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")
// const start = document.getElementById("start")

const game = new Game(ctx)

window.onload = function() {
    game._getReady()
  // const start = document.getElementById("start-btn")
  // start.onclick = function() {
  //   game._runAnimationLoop();
  // };
  canvas.addEventListener("click", function(){
    game._runAnimationLoop()
  })
}