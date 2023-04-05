
import {depth} from './scripts/boundary';
import Sub from './scripts/sub';
import Ocean from './scripts/ocean';
import Cockpit from './scripts/cockpit';
import {getCursorPosition} from './scripts/util';
import Keymaster from './scripts/keymaster';

console.log('WEBACK IS WORKINGcccc');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth*2.5;
  canvas.height = window.innerHeight*1.9;

  let ocean = new Ocean({ctx});
  let sub = new Sub({ctx});
  let key = new Keymaster({ ctx, ocean, sub});
  let cockpit = new Cockpit({ctx});
  let flag = false;

  ctx.onload = () => {
    ocean.draw();
  }
  console.log(canvas.width, 'canvas.width indexjs')
  console.log(canvas.height, 'canvas.height indexjs')

  ctx.canvas.addEventListener('mousedown', function(e) {
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
      // sub.draw2();
      depth(ocean,sub, canvas);
      request = requestAnimationFrame(update)   
    } else {
       cancelAnimationFrame(request)
       clear();
       cockpit.draw();
    }
  }

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

  document.addEventListener('keydown', keyDown);
})