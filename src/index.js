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
  const canvas1 = document.getElementById('canvas1');
  const canvas2 = document.getElementById('canvas2');
  const canvas3 = document.getElementById('canvas3');
  

  const ctx2 = canvas2.getContext("2d");
  const ctx1 = canvas1.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
 
 
  
  canvas1.width = WIDTH;
  canvas1.height = HEIGHT;
  canvas2.width = WIDTH;
  canvas2.height = HEIGHT;
  canvas3.width = WIDTH;
  canvas3.height = HEIGHT;


  let open = new Open({ctx: ctx2})
  // let oceanView = new OceanView({ctx});
  let ocean = new Ocean({ctx: ctx1});
  let sub = new Sub({ctx:ctx1});
  let key = new Keymaster({ ctx: ctx1, ocean, sub});
  let cockpit = new Cockpit({ctx: ctx3});
  let flag = true;

  ctx1.onload = () => {
    console.log('ctx3 on load')
    ocean.draw();
    sub.draw();
  
 }
    // showCanvas1()
    ctx2.onload = () => {
    
      ctx1.onload = () => {
        cockpit.draw();
         

      
    }
  }
  console.log(canvas1.width, 'canvas.width indexjs')
  console.log(canvas1.height, 'canvas.height indexjs')


    let handler1 = function(e) {
      console.log('mouse clicked in listener 1 indexjs') 
        getCursorPosition(canvas1, e)  
        // flag === false ? flag = true : flag = false    
        // if (flag) {
        
          cockpit.draw();
          showCanvas3()
        
        // }
        update(flag)
       
      }
    ctx1.canvas.addEventListener('mousedown',handler1 )
    
    canvas2.addEventListener('mousedown', function(e) {
      getCursorPosition(canvas2, e) 
      console.log('mouse clicked in listener 2 indexjs') 
      showCanvas3()
      // flag === false ? flag = true : flag = false    
      // if (flag) {
        cockpit.draw();
        
      // }
      // update(flag)
    })

    // canvas3.addEventListener('mousedown', function(e) {
    //   getCursorPosition(canvas3, e)  
    //   console.log('mouse clicked in listener 3 indexjs')
    //   showCanvas1()
    //   // flag === false ? flag = true : flag = false    
    //   // if (flag) {
    //     // cockpit.draw();
        
    //   // }
    //   // update(flag)
    // })
  function clear(){
    ctx1.clearRect(0,0, canvas1.width, canvas1.height)
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
      depth(ocean,sub, canvas1);
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