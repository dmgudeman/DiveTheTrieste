export function showDepth(ocean, sub, canvas) {
  const SEA_DEPTH = 36161;
  let conversion = SEA_DEPTH / canvas.height;
  let composite = ocean.sy + sub.y - sub.initialDepthPos;
  let depth = Math.floor(conversion * composite);
  if (depth < 0) depth = 0;
  let d = document.getElementById("depth");
  d.innerHTML = `Depth: ${depth} feet`;
  return depth;
}

// export function makeDepthGauge(ctx){
//   let dg = document.createElement("h2");
//   ctx.appendChild(dg);


// }

export function pickImageArray(ocean, sub, ctx) {
  let x = ocean.sx + sub.x + sub.initialLateralPos;
  let y = ocean.sy + sub.y + sub.initialDepthPos;
  let deep = y / ctx.canvas.height;
  let lat = x / ctx.canvas.width;
  if (lat < 0.5) {
    if (deep < 0.3) {
      return 0; //eb
    } else {
      return 2; //db
    }
  } else {
    if (deep < 0.25) {
      return 1;
    } else if (deep < 0.5) {
      return 3;
    } else if (deep < 0.75) {
      return 5;
    } else {
      return 4;
    }
  }
}

export function detectDepth(ocean, sub, canvas, dir) {
  if (dir === "down") {
    if (ocean.sy >= ocean.depthLimit) {
      return (ocean.depthFlag = "STOP_DESCENT");
    } else if (ocean.sy < ocean.depthLimit) {
      return (ocean.depthFlag = "OCEAN");
    }
  }

  if (dir === "up") {
    if (ocean.sy <= 0) {
      ocean.sy = 0;
      return (ocean.depthFlag = "STOP_ASCENT");
    } else if (ocean.sy > 0) {
      return (ocean.depthFlag = "OCEAN");
    }
  }
  return ocean;
}

export function detectLateral(ocean, sub, canvas, dir) {
  if (dir === "right") {
    if (ocean.sx < ocean.lateralLimit) {
      return (ocean.lateralFlag = "OCEAN");
    } else if (ocean.sx > ocean.lateralLimit) {
      return (ocean.lateralFlag = "STOP_RIGHT");
    }
  }
  if (dir === "left") {
    if (ocean.sx > 0) {
      return (ocean.lateralFlag = "OCEAN");
    } else if (ocean.sx < 0) {
      return (ocean.lateralFlag = "STOP_LEFT");
    }
  }
}
