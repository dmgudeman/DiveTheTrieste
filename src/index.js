// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

// dmgudeman.github.io/DiveTheTrieste

import { showCanvas1, showCanvas2, showCanvas3 } from "./scripts/util";
import { depth } from "./scripts/boundary";
import Sub from "./scripts/sub";
import Ocean from "./scripts/ocean";
import Cockpit from "./scripts/cockpit";
import { getCursorPosition } from "./scripts/util";
import Keymaster from "./scripts/keymaster";

const WIDTH = window.innerWidth * 2.5;
const HEIGHT = window.innerHeight * 1.9;

document.addEventListener("DOMContentLoaded", () => {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");

  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");

  canvas1.width = WIDTH;
  canvas1.height = HEIGHT;
  canvas2.width = WIDTH;
  canvas2.height = HEIGHT;
  canvas3.width = WIDTH;
  canvas3.height = HEIGHT;

  let ocean = new Ocean({ ctx: ctx1 });
  let sub = new Sub({ ctx: ctx1 });
  let key = new Keymaster({ ctx: ctx1, ocean, sub });
  let cockpit = new Cockpit({ ctx: ctx3, sub, ocean });

  const rect2 = canvas2.getBoundingClientRect();
  canvas2.addEventListener("click", (e) => {
    const x = e.clientX - rect2.left;
    const y = e.clientY - rect2.top;
    if (x > 100 && x < 300 && y > 100 && y < 150) {
      window.location.href = "https://github.com/dmgudeman";
    }
  });

  canvas2.addEventListener("click", (e) => {
    const x = e.clientX - rect2.left;
    const y = e.clientY - rect2.top;
    if (x > 100 && x < 300 && y > 200 && y < 250) {
      window.location.href = "https://www.linkedin.com/in/davidmgudeman/";
    }
  });
  canvas2.addEventListener("click", (e) => {
  
    const x = e.clientX - rect2.left;
    const y = e.clientY - rect2.top;
    if (x > 100 && x < 300 && y > 300 && y < 350) {
      showCanvas1();
    }
  });
  // button 4
  let audioFlag = false;
function toggleAudio () {
  let button4 = { x: 100, y: 400, width: 250, height: 50 };
    let audio = document.getElementById("music")
    console.log('audio.paused', audio.paused)
    if (audioFlag){
      audio.play() 
      ctx2.clearRect(button4.x, button4.y, button4.width, button4.height);
      ctx2.fillStyle = "#fff";
      ctx2.fillRect(button4.x, button4.y, button4.width, button4.height);
      ctx2.fillText("", 115, 432); 
      ctx2.fillStyle = "#4CAF50";
      ctx2.font = "bold 20px Arial";
      ctx2.fillText("Pause Music", 115, 432);  
        } else {
         console.log('hi there')
       audio.pause();
       ctx2.clearRect(button4.x, button4.y, button4.width, button4.height);
       ctx2.fillStyle = "#fff";
       ctx2.fillRect(button4.x, button4.y, button4.width, button4.height);
       ctx2.fillText("", 115, 432); 
       ctx2.fillStyle = "#4CAF50";
       ctx2.font = "bold 20px Arial";
       ctx2.fillText("Play Music", 115, 432); 
      }
   audioFlag = !audioFlag;

  }
  canvas2.addEventListener("click", (e) => {
    const x = e.clientX - rect2.left;
    const y = e.clientY - rect2.top;
    if (x > 100 && x < 300 && y > 400 && y < 450) {
     toggleAudio();
    }
  });

  // make the instruction page canvas
  const backgroundImage = new Image();
  backgroundImage.src = "assets/openOcean.png";
  
  backgroundImage.onload = function () {
    ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);
    backgroundImage.style.zIndex = 100;


    const instructions = new Image();
    instructions.src = "assets/instructions.png";

    instructions.onload = () => {
      ctx2.drawImage(instructions, 450, 250, 600, 600);
    };
    // draw first button
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(100, 100, 250, 50);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 20px Arial";
    ctx2.fillText("D Gudeman Github", 115, 132);

    // draw second button
    let button2 = { x: 100, y: 200, width: 250, height: 50 };
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(button2.x, button2.y, button2.width, button2.height);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 20px Arial";
    ctx2.fillText("D Gudeman Linked In", 114, 232);

    let button3 = { x: 100, y: 300, width: 250, height: 50 };
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(button3.x, button3.y, button3.width, button3.height);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 20px Arial";
    ctx2.fillText("Go To The Trieste", 114, 332);
    
   
    let button4 = { x: 100, y: 400, width: 250, height: 50 };
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(button4.x, button4.y, button4.width, button4.height);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 20px Arial";
    ctx2.fillText("Play Music", 114, 432);

    let banner = { x: 450, y: 100, width: 600, height: 150 };
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(banner.x, banner.y, banner.width, banner.height);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 50px Arial";
    ctx2.fillText("DIVE THE TRIESTE!", 520, 175);
  };
  const instructions = new Image();
  instructions.src = "assets/instructions.png";
  instructions.onload = () => {
    ctx2.drawImage(instructions, 450, 250, 600, 600);
    update();
  };



  //use update to make sure the canvas is rendered
  function handler1(e) {
    getCursorPosition(canvas1, e);
    cockpit.draw();
    showCanvas3();
    update();
  }
  ctx1.canvas.addEventListener("mousedown", handler1);

  // adding click function to the cockpit
  const rect = canvas3.getBoundingClientRect();
  canvas3.addEventListener("mousedown", (e) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x > 300 && x < canvas3.width*0.7 && y > 100 && y < canvas3.height*0.7) {
      cockpit.draw();   
    }
  });

  function clear() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  }
  const spriteSheet = new Image();
   spriteSheet.src = 'assets/sprite.png';

   spriteSheet.onload = () => {
      ctx1.drawImage(spriteSheet, 0, 0, 500, 500);
   }

const sprites = [
  { x: 0, y: 0, width: 125, height: 200 },
  { x: 135, y: 0, width: 135, height: 200 },
  { x: 280, y: 0, width: 125, height: 200 },
  { x: 410, y: 0, width: 140, height: 200 }
];
 

  let currentFrame = 0;
  let lastFrameTime = 0; 
  // main animation loop
  function update(currentTime) {
    const elapsedTime = currentTime - lastFrameTime;
    if (elapsedTime > 1000/10) {
    clear();
    ocean.draw();
    // sub.draw();
    depth(ocean, sub, canvas1);
    const sprite = sprites[currentFrame];
          ctx1.drawImage(spriteSheet, sprite.x, sprite.y, sprite.width, sprite.height, sub.x, sub.y, sub.w, sub.h);
          currentFrame++;
          if (currentFrame >= sprites.length) {
            currentFrame = 0;
          }
    lastFrameTime = currentTime; 
    }
    requestAnimationFrame(update);
  }

  function keyDown(e) {
    if (e.key === "ArrowDown" || e.key === "Down") {
      key.newPos("down");
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
      key.newPos("left");
    } else if (e.key === "ArrowRight" || e.key === "Rigth") {
      key.newPos("right");
    } else {
      key.newPos("up");
    }
  }

  document.addEventListener("keydown", keyDown);
});


// const spriteSheet = new Image();
//    spriteSheet.src = 'sprite.png';

// const sprites = [
//   { x: 0, y: 0, width: 125, height: 200 },
//   { x: 135, y: 0, width: 135, height: 200 },
//   { x: 280, y: 0, width: 125, height: 200 },
//   { x: 410, y: 0, width: 140, height: 200 }

// ];

// const canvas3 = document.getElementById('canvas3');
// const ctx = canvas3.getContext('2d');
// canvas3.width =1000;
// canvas3.height = 1000;
// ctx.drawImage(spriteSheet, 0, 0, 500, 500);
// canvas3.width = sprites[0].width;
// canvas3.height = sprites[0].height;
//   let currentFrame = 0
//   let lastFrameTime = 0; 
//   function animate(currentTime) {
//     const elapsedTime = currentTime - lastFrameTime;
//     if (elapsedTime > 1000/15) {
//       ctx.clearRect(0, 0, canvas3.width, canvas3.height);
//       const sprite = sprites[currentFrame];
//       ctx.drawImage(spriteSheet, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, canvas3.width, canvas3.height);
//       currentFrame++;
//       if (currentFrame >= sprites.length) {
//         currentFrame = 0;
//       }
//       lastFrameTime = currentTime; 
//     }
//     requestAnimationFrame(animate);
//   }
  

//   animate();

// })