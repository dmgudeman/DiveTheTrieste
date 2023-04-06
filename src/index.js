// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

import { showCanvas1, showCanvas2, showCanvas3 } from "./scripts/util";
import { depth } from "./scripts/boundary";
import Sub from "./scripts/sub";
import Ocean from "./scripts/ocean";
import Cockpit from "./scripts/cockpit";
import { getCursorPosition } from "./scripts/util";
import Keymaster from "./scripts/keymaster";
import Images from "./scripts/images";

console.log("WEBACK IS WORKINGcccc");
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
  let images = new Images({ ctx: ctx1, sub, ocean });
  let cockpit = new Cockpit({ ctx: ctx3, sub, ocean });

  let flag = true;

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
      showCanvas1()
    }
  });

  // make the instruction page canvas
  const backgroundImage = new Image();
  backgroundImage.src = "assets/openOcean.png";
  backgroundImage.style.zIndex = 20;
  backgroundImage.onload = function () {
    ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);
    let d = document.getElementById('depth');
    d.style.display = 'none';

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
      update()
  };

  const oceanBackDrop = new Image();
     oceanBackDrop.src = "assets/crossSection.png"
     oceanBackDrop.onLoad = () => {
     
      ctx1.drawImage(oceanBackDrop, 0, 0, WIDTH, HEIGHT);
      sub.draw();
    

     }

  // ctx1.onload = () => {
  //   ocean.draw();
  //   sub.draw();
  //   ctx3.onload = () => {
  //     cockpit.draw();
  //   };
  // };
  // showCanvas1()

  console.log(canvas1.width, "canvas.width indexjs");
  console.log(canvas1.height, "canvas.height indexjs");

  function handler1(e) {
    console.log("mouse clicked in listener 1 indexjs");
    getCursorPosition(canvas1, e);
    // flag === false ? flag = true : flag = false
    // if (flag) {
    images.pickSector();
    cockpit.draw();
    showCanvas3();

    // }
    update(flag);
  }
  ctx1.canvas.addEventListener("mousedown", handler1);
  const rect = canvas3.getBoundingClientRect();
  canvas3.addEventListener("mousedown", (e) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x > 300 && x < 1000 && y > 100 && y < 800) {
      console.log("MOUSE DOWN!");
      cockpit.draw();
    }
  });

  // canvas2.addEventListener("mousedown", (e) => {
  //   getCursorPosition(canvas2, e);
  //   console.log("mouse clicked in listener 2 indexjs");
  //   showCanvas3();
  //   // flag === false ? flag = true : flag = false
  //   // if (flag) {
  //   cockpit.draw();

  //   // }
  //   // update(flag)
  // });

  // canvas3.addEventListener('mousedown', (e) => {
  //   getCursorPosition(canvas3, e)
  //   console.log('mouse clicked in listener 3 indexjs')
  //   showCanvas1()
  //   // flag === false ? flag = true : flag = false
  //   // if (flag) {
  //     // cockpit.draw();

  //   // }
  //   // update(flag)
  // })
  function clear() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  }

  let request;

  // main animation loop
  function update() {
    // if (flag) {
    clear();
    // oceanView.draw();
    ocean.draw();
    sub.draw();
    // sub.draw2();
    depth(ocean, sub, canvas1);
    request = requestAnimationFrame(update);
    // } else {
    //   cancelAnimationFrame(request);
    //   clear();
    //   cockpit.draw();
    // }
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
