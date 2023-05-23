import {DEPTH_CONT_SHELF, LEFT_EDGE_TRENCH, RIGHT_EDGE_TRENCH } from './constants';


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
    console.log('sx', ocean.sx, 'sy', ocean.sy)
    if(ocean.sx < LEFT_EDGE_TRENCH || ocean.sx > RIGHT_EDGE_TRENCH) {
      if (ocean.sy <= DEPTH_CONT_SHELF){
        return (ocean.depthFlag = "OCEAN")
      } else {
        return (ocean.depthFlag = "SHELF_STOP_DESCENT");
      }
    } else {
    if (ocean.sy >= ocean.depthLimit) {
      return (ocean.depthFlag = "STOP_DESCENT");
      } else if (ocean.sy <= ocean.depthLimit) {
        return (ocean.depthFlag = "OCEAN");
      }
    }
    return "DEFAULT_DEPTH_DOWN"
  }



  if (dir === "up") {
    if (ocean.sy <= 0) {
      ocean.sy = 0;
      return (ocean.depthFlag = "STOP_ASCENT");
    } else if (ocean.sy > 0) {
      return (ocean.depthFlag = "OCEAN");
    }
    return "DEFAULT_DEPTH_UP"
  }
  return {"flag":"DEFAULT_DEPTH", "ocean.sy": ocean.sy};
}

export function detectLateral(ocean, sub, canvas, dir) {
  if (dir === "right") {
    if (ocean.sx < ocean.lateralLimit) {
      return (ocean.lateralFlag = "OCEAN");
    } else if (ocean.sx >= ocean.lateralLimit) {
      ocean.lateralFlag = "STOP_RIGHT";
      return "STOP_RIGHT"
    }
  }
  if (dir === "left") {
    if (ocean.sx > 0 && ocean.sx < LEFT_EDGE_TRENCH) {
       ocean.lateralFlag = "OCEAN";
       return "OCEAN";
    } else if (ocean.sx > LEFT_EDGE_TRENCH && ocean.sy < DEPTH_CONT_SHELF) {
      ocean.lateralFlag = "OCEAN"
      return "OCEAN";
    } else if (ocean.sx < LEFT_EDGE_TRENCH && ocean.sy > DEPTH_CONT_SHELF) {
      ocean.lateralFlag = "STOP_LEFT_EDGE";
      return "STOP_LEFT";
    } else if (ocean.sx < 0) {
      ocean.lateralFlag = "STOP_LEFT";
      return "STOP_LEFT";
    }
  }
  return "DEFAULT_LATERAL"
}
