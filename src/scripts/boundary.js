
export function depth(ocean, sub, canvas){
  const SEA_DEPTH = 36161;
  let conversion = SEA_DEPTH / canvas.width;
  let composite = ocean.sy + sub.y - sub.initialDepthPos;
  let depth = Math.floor(conversion * composite);
  let d = document.getElementById("depth");
  d.innerHTML = `Depth: ${ocean.sy } feet`;
}

export function detectDepth(ocean, sub, canvas, dir){


  if (dir === 'down'){
    if (ocean.sy >=  ocean.depthLimit) {
      return  ocean.depthFlag = 'STOP_DESCENT';
    } else if (ocean.sy < ocean.depthLimit){
      return ocean.depthFlag = 'OCEAN';
    }   
  }
 
  if (dir === 'up'){
    if (ocean.sy <= 0) {
      ocean.sy = 0;
      return ocean.depthFlag = 'STOP_ASCENT';
    } else if (ocean.sy >0 ){
    
      return ocean.depthFlag = 'OCEAN';
    }
  }
  return ocean;
}

export function detectLateral(ocean, sub, canvas, dir){
  if (dir === 'right'){
    if  (ocean.sx < ocean.lateralLimit){
      return ocean.lateralFlag = "OCEAN"; 
    } else if (ocean.sx > ocean.lateralLimit) {
    return  ocean.lateralFlag = 'STOP_RIGHT'
  }
}
  if (dir === 'left'){
      if  (ocean.sx > 0){
        return ocean.lateralFlag = "OCEAN"; 
      } else if (ocean.sx <0) {
      return  ocean.lateralFlag = 'STOP_LEFT'
    }
  }
}