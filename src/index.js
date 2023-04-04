
import {detectDepth, detectWindowEdge, depth} from './scripts/boundary';
import Sub from './scripts/sub';
import Ocean from './scripts/ocean';
import Cockpit from './scripts/cockpit';
import {getCursorPosition} from './scripts/util';
import Keymaster from './scripts/keymaster';

console.log('WEBACK IS WORKINGcccc');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext("2d");

  // canvas.width = window.innerWidth*2.5;
  // canvas.height = window.innerHeight*1.9;
  canvas.width = 4000;
  canvas.height = 2000;

  let ocean = new Ocean({canvas, ctx});
  let sub = new Sub({canvas, ctx});
  let key = new Keymaster({ canvas, ctx, ocean, sub});
  let cockpit = new Cockpit({canvas, ctx});
  let flag = false;

  
  console.log(canvas.width, 'canvas.width indexjs')
  console.log(canvas.height, 'canvas.height indexjs')



  canvas.addEventListener('mousedown', function(e) {
      getCursorPosition(canvas, e)  
      flag === false ? flag = true : flag = false    
      if (flag) {
        cockpit.draw();
        canvas.addEventListener('dblclick', function(e) {})
      }
      update(flag)
    })
  function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
  }

 
  
  
  let request;
  
  // main animation loop
  function update(flag) {
    if (flag){
      clear();
      ocean.draw();
      sub.draw();
      depth(ocean,sub, canvas);
      request = requestAnimationFrame(update)   
    } else {
       cancelAnimationFrame(request)
       clear();
       cockpit.draw();
    }
  }

  // function keyUp(e) {
  //   if(
  //   e.key === "Right" ||
  //   e.key === "ArrowRight" ||
  //   e.key === "Left" ||
  //   e.key === "ArrowLeft" ||
  //   e.key === "Up" ||
  //   e.key === "ArrowUp" ||
  //   e.key === "Down" ||
  //   e.key === "ArrowDown" 
  //   ){
  //     sub.dx = 0;
  //     sub.dy = 0;
  //   }
  // }
 
  function keyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'Down'){
        key.newPos('down');
    } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
        key.newPos('left');
    } else if (e.key === 'ArrowRight' || e.key === 'Rigth'){
        key.newPos('right');
    } else {
        key.newPos('up')
  }
}
  // document.addEventListener('keyup', keyUp);
  document.addEventListener('keydown', keyDown);
})