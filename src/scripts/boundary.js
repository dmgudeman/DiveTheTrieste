

export function depth(ocean, sub, canvas){
  const SEA_DEPTH = 36161;
  let conversion = SEA_DEPTH / canvas.width;
  let composite = ocean.sy + sub.y - sub.initialDepthPos;
  let depth = Math.floor(conversion * composite);
  let d = document.getElementById("depth");
  d.innerHTML = `Depth: ${depth } feet`;
}



export function detectDepth(ocean, sub, canvas, dir){
  const oceanBottom = canvas.height;
  let depthFlag = 'MOVE';
  sub.initialDepthPos = ocean.surface_y;
  let composite = sub.initialDepthPos + ocean.sy + sub.y 

    // console.log(oceanBottom, 'oceanBottom')
    // console.log(height,  'height')
    console.log(sub.initialDepthPos, 'sub.inititalDepthPos')
    console.log(ocean.sy, 'ocean.sy')
    console.log(sub.y, 'sub.y')
    console.log(composite, 'compposite')
  if (dir === 'down'){
    if (sub.y+ sub.initialDepthPos >= oceanBottom){
      console.log('STOP_DESCENT')
      return  depthFlag = 'STOP_DESCENT'
    } else if ((oceanBottom - ocean.sy - sub.y) < oceanBottom*0.58) {
      console.log('SUB')
      return depthFlag = "SUB";
    } else {
      console.log(ocean.sy, 'D ocean.sy')
      console.log(sub.y, 'D sub.y')

      console.log('OCEAN')
      return depthFlag = 'OCEAN'
    }   
  }

  if (dir === 'up'){
    if (ocean.sy <= 0) {
      console.log(ocean.sy, 'U ocean.sy')
      console.log(sub.y, 'U sub.y')
      console.log(ocean.surface_y, 'ocean.surface_y')

      console.log('STOP_ASCENT')
      return depthFlag = 'STOP_ASCENT' 
    } else if ((oceanBottom -  ocean.sy - sub.y ) < oceanBottom*0.58) {
      console.log('SUB')
      return depthFlag = "SUB";
    } else {
      console.log('OCEAN')
      return depthFlag = 'OCEAN'
    }
  }
  return depthFlag;
}

export function detectLateral(ocean, sub, canvas, dir){
  // canvas.width = 4000;
  // canvas.height = 2000;

  let oceanRight = canvas.width;
  let oceanBottom = canvas.height;
  let lateralFlag = 'MOVE_LATERAL';
  let composite = sub.initialLateralPos  + ocean.sx + sub.x 

  if (dir === 'right'){
    // console.log(oceanRight, 'oceanRight')
    // console.log(canvas.width,  'canvas width')
    // console.log(sub.initialLateralPos, 'subinitialLaateralPositoin')
    // console.log(ocean.sx, 'ocean.sx')
    // console.log(sub.x, 'sub.x')
    // console.log(composite, 'compposite')
    if ((oceanRight - composite  )< 200){
      console.log('STOP RIGHT')
      return  lateralFlag = 'STOP_RIGHT'
    } else if (( ocean.sx + sub.initialLateralPos +sub.x ) > oceanRight*0.75) {
      console.log('SUB')
      return lateralFlag = "SUB";
    } else {
      console.log('OCEAN')
      return lateralFlag = 'OCEAN'
    }   
  }

  if (dir === 'left'){
    console.log('in LEFT')
    if ((ocean.sx +sub.x)<=sub.initialLateralPos){
      console.log((ocean.sx +sub.x), "OR -COMP")
      return  lateralFlag = 'STOP_LEFT'
    } else if (( ocean.sx + sub.initialLateralPos +sub.x ) > oceanRight*0.75) {
      return lateralFlag = "OCEAN";
    } else {
      return lateralFlag = 'SUB'
    } 
  }
}

 
