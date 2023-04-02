
import {detectDepth, detectWindowEdge} from './scripts/boundary';
import Sub from './scripts/sub';
import Ocean from './scripts/ocean';
import Cockpit from './scripts/cockpit';
import {getCursorPosition} from './scripts/util'
console.log('WEBACK IS WORKINGcccc');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth*2.5;
  canvas.height = window.innerHeight*2;
  let ocean = new Ocean({canvas, ctx});
  let sub = new Sub({canvas, ctx});
  let cockpit = new Cockpit({canvas, ctx});
  let flag = true;
  
  
  canvas.addEventListener('mousedown', function(e) {
      getCursorPosition(canvas, e)  
     flag === false ? flag = true : flag = false 
     console.log(flag)
     
    update(flag)
   

    
     })


  function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
  }

  function newPos(sub){
    sub.x += sub.dx;
    sub.y += sub.dy;
    detectDepth(sub, canvas);
    detectWindowEdge(sub, canvas);
  }
  let request;
  
  
  function update(flag) {
    console.log("in update else statment")
    if (flag){
      
      clear();
      ocean.draw();
      sub.draw();
      newPos(sub);
      request = requestAnimationFrame(update)   
    } else {
       cancelAnimationFrame(request)
       clear();
       console.log("in update else statment")
       cockpit.draw();

    }
  }




  function moveUp(e) {
   sub.dy = -sub.vel;   
  }

  function moveDown(e) {
    sub.dy = sub.vel;
  }

  function moveLeft(e) {
    sub.dx = -sub.vel;
  }
  function moveRight(e) {
    sub.dx = sub.vel;  
  }

  function keyUp(e) {
    if(
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft" ||
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown" 
    ){
      sub.dx = 0;
      sub.dy = 0;
    }
  }
 
  function keyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'Down'){
      console.log('keydown')
        moveDown();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
      moveLeft()
    } else if (e.key === 'ArrowRight' || e.key === 'Rigth'){
      moveRight();
    } else {
      moveUp();
  }
}
  document.addEventListener('keyup', keyUp);
  document.addEventListener('keydown', keyDown);
})