// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

import {showCanvas1, showCanvas2, showCanvas3} from './scripts/util'
import {depth} from './scripts/boundary';
import OceanView from './scripts/ocean_view';
import Sub from './scripts/sub';
import Ocean from './scripts/ocean';
import Open from './scripts/open';
import Cockpit from './scripts/cockpit';
import {getCursorPosition} from './scripts/util';
import Keymaster from './scripts/keymaster';

console.log('WEBACK IS WORKINGcccc');
const WIDTH = window.innerWidth * 2.5;
const HEIGHT = window.innerHeight * 1.9;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext("2d");
  const canvas2 = document.getElementById('canvas2');
  const ctx2 = canvas.getContext("2d");
  const canvas3 = document.getElementById('canvas3');
  const ctx3 = canvas3.getContext("2d");
  
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas2.width = WIDTH;
  canvas2.height = HEIGHT;
  canvas3.width = WIDTH;
  canvas3.height = HEIGHT;


  let open = new Open({ctx: ctx2})
  // let oceanView = new OceanView({ctx});
  let ocean = new Ocean({ctx});
  let sub = new Sub({ctx});
  let key = new Keymaster({ ctx, ocean, sub});
  let cockpit = new Cockpit({ctx: ctx3});
  let flag = true;

  ctx.onload = () => {
    ocean.draw();
    showCanvas1()
  }
  console.log(canvas.width, 'canvas.width indexjs')
  console.log(canvas.height, 'canvas.height indexjs')


    let handler1 = function(e) {
      console.log('mouse clicked in listener 1 indexjs') 
        getCursorPosition(canvas, e)  
        // flag === false ? flag = true : flag = false    
        // if (flag) {
        
          cockpit.draw();
          showCanvas2()
        
        // }
        update(flag)
        canvas.removeEventListener('click', handler1);
      }
    ctx.canvas.addEventListener('mousedown',handler1 )
    
    canvas2.addEventListener('mousedown', function(e) {
      getCursorPosition(canvas, e) 
      console.log('mouse clicked in listener 2 indexjs') 
      showCanvas3()
      // flag === false ? flag = true : flag = false    
      // if (flag) {
        cockpit.draw();
        
      // }
      // update(flag)
    })

    // canvas3.addEventListener('mousedown', function(e) {
    //   getCursorPosition(canvas, e)  
    //   console.log('mouse clicked in listener 3 indexjs')
    //   showCanvas1()
    //   // flag === false ? flag = true : flag = false    
    //   // if (flag) {
    //     cockpit.draw();
        
    //   // }
    //   // update(flag)
    // })
  function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
  }
 
  let request;
  
  // main animation loop
  function update(flag) {
    if (flag){
      clear();
      // oceanView.draw();
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