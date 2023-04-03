
import {detectDepth, detectWindowEdge} from './scripts/boundary';
import Sub from './scripts/sub';
import Ocean from './scripts/ocean';
import Cockpit from './scripts/cockpit';
import {getCursorPosition} from './scripts/util';
import Keymaster from './scripts/keymaster';
console.log('WEBACK IS WORKINGcccc');

document.addEventListener("DOMContentLoaded", () => {
  function loadImages(images, onComplete) {

    let loaded = 0;

    function onLoad() {
        loaded++;
        if (loaded == images.length) {
            onComplete();
        }
    }

    for (let i = 0; i < images.length; i++) {
        let img = new Image();
        img.addEventListener("load", onLoad);
        img.src = images[i];
        imageObjects.push(img);
    }
    return imageObjects;
}
  


  const canvas = document.querySelector('canvas');

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth*2.5;
  canvas.height = window.innerHeight*1.9;
  let ocean = new Ocean({canvas, ctx});
  let sub = new Sub({canvas, ctx});
  let key = new Keymaster({ canvas, ctx, ocean, sub});
  let cockpit = new Cockpit({canvas, ctx, imageObjects});
  let flag = false;
  let imageObjects = [];
  let depthFlag = false;

  let bcr =canvas.getBoundingClientRect()

  let oceanBottom = bcr.height;
  let oceanRight = bcr.width;
//   loadImages(["assets/life/euphotic-pelagic/001_shark.jpg", 
// "assets/life/aphotic-pelagic/001_aphotic-fish.jpeg"], cockpit.draw);
  
  // open cockpit
  canvas.addEventListener('mousedown', function(e) {
      getCursorPosition(canvas, e)  
      let bcr =canvas.getBoundingClientRect()
    
      flag === false ? flag = true : flag = false    
      if (flag) {
        cockpit.draw(depth);
      }
      update(flag)
    })


  function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
  }

  // function newPos(dir){
  //   detectDepth(ocean, sub, canvas, ctx);
  //   if(!depthFlag){
  //     if (dir === 'down'){
  //       ocean.vely += 1
  //       ocean.sy += ocean.vely;
  //     } else if ( dir === 'right'){
  //       ocean.velx += 1;
  //       ocean.sx += ocean.velx;
  //     } else if ( dir === 'left'){
  //       ocean.sx -= 10;
  //     } else {
  //       ocean.sy -= 10;
  //     }
  //   }
  
  //  else{
    
  //     if (dir === 'down'){

  //     } else if ( dir === 'right'){
  //     sub.velx += 1;
  //     sub.x +=sub.velx;
  //     } else if ( dir === 'left'){
  //     sub.x -= 10;
  //     } else {
  //     sub.y -= 10;
  //     }
  //   }
  //   // detectWindowEdge(sub, canvas);
  // }
  
  
  let request;
  
  // main animation loop
  function update(flag) {
    (ocean.sy + sub.y) >= 0.5*oceanBottom ? depthFlag = true :depthFlag = false;
    if (flag){
      clear();
      ocean.draw();
      sub.draw();
      key.
      request = requestAnimationFrame(update)   
    } else {
       cancelAnimationFrame(request)
       clear();
       cockpit.draw(depth);
    }
  }

  //preload the images for the cockpit
 




function init() {
    alert("start game");
    // use imageObjects which will contain loaded images
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
     
        key.newPos('down');
    } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
      key.newPos('left');
    } else if (e.key === 'ArrowRight' || e.key === 'Rigth'){
     
      key.newPos('right');
    } else {
      key.newPos('up')
  }
}
  document.addEventListener('keyup', keyUp);
  document.addEventListener('keydown', keyDown);
})