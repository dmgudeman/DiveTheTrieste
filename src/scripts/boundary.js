
function updateDepth(y, x, el) {
//   console.log((y)*21.66, "yyyyyy in update Depth")
  // console.log(y, "yyyyyy in update Depth 2")
  // console.log(x, "XXXX in update Depth ")


 
}

function convertDepth(depth){


  return depth/21.66 + 87;
}
export function detectDepth(ocean, sub, canvas, dir){
  canvas.width = window.innerWidth*2.5;
  canvas.height = window.innerHeight*1.9;
  const SEA_DEPTH = 36161;

  // get overall pixel coordinates of the canvas
  let bcr =canvas.getBoundingClientRect()
  // console.log(bcr.width, bcr.height, "bcrWidth, bcrHeight")
  let oceanBottom = bcr.height;
  let oceanRight = bcr.width;
  let surface_y = sub.initalDepthPosition;
  let conversion =SEA_DEPTH/oceanBottom;

  let depth = Math.floor(conversion + surface_y );
  let d = document.getElementById("depth");
  d.innerHTML = `Depth: ${depth }feet`;
  // console.log("==========================================")
  // console.log(oceanBottom, 'OCEAN BOTTOM')
  // console.log(sub.y, 'sub.y')
  // console.log(ocean.sy, 'oceansy')
  // console.log(oceanBottom-ocean.sy, 'oceanBottom-ocean.sy')

  let depthFlag = 'MOVE'
  if (dir === 'down'){
    if ((oceanBottom - ocean.sy - sub.y )< 200){
        return  depthFlag = 'STOP_DESCENT'
    } else if ((oceanBottom - ocean.sy - sub.y) < oceanBottom*0.50) {
      console.log (oceanBottom - ocean.sy - sub.y, 'COMPOSITE SOWN')
      console.log(oceanBottom*0.50, "limit down")
      return depthFlag = "SUB";
    } else {
      return depthFlag = 'OCEAN'
    }
    
  }

  if (dir === 'up'){
    if ((sub.y + ocean.sy) < (ocean.surface_y )) {
      return depthFlag = 'STOP_ASCENT' 
    } else if ((oceanBottom -  ocean.sy - sub.y ) < oceanBottom*0.50) {
      return depthFlag = "SUB";
    } else {
      return depthFlag = 'OCEAN'
    }
  }

  return depthFlag;


}

export function detectLateral(ocean, sub, canvas, dir){
  canvas.width = window.innerWidth*2.5;
  canvas.height = window.innerHeight*1.9;
  let bcr =canvas.getBoundingClientRect()
  let oceanRight = bcr.width;
  let lateralFlag = 'MOVE_LATERAL';

  if (dir === 'right'){
    console.log(oceanRight*0.50, "limit right")
  console.log (ocean.sx, sub.x, 'ocean.sx, sub.x')

    if ((oceanRight - sub.initialLateralPos  - ocean.sx - sub.x  )< 600){
   
        return  lateralFlag = 'STOP_RIGHT'
    } else if ((oceanRight - ocean.sx - sub.x) < oceanRight*0.50) {
    
   
      console.log( "SUB")
      return lateralFlag = "SUB";
    } else {
      console.log( "OCEAN")
      return lateralFlag = 'OCEAN'
    }
    
  }
  if (dir === 'left'){
    console.log(sub.initialLateralPos, 'sub.initialLateralPos');
    console.log(ocean.sx, 'ocean.sx');
    console.log(sub.x,'sub.x' );
    console.log(oceanRight, 'oceanRight')

    if ((sub.initialLateralPos + ocean.sx )<=sub.initialLateralPos){
      // console.log('STOP_LEFT in boundary')
      // console.log(oceanRight - ocean.sx - sub.x , "COMPOSITE bigger than =>")
      // console.log(sub.initialLateralPos);

        return  lateralFlag = 'STOP_LEFT'
    } else if ((oceanRight - ocean.sx - sub.x) < oceanRight*0.50) {
      // console.log (oceanRight - ocean.sx - sub.x, 'COMPOSITE RIGHT')
      // console.log(oceanRight*0.50, "limit right")
      console.log( "SUB")
      return lateralFlag = "SUB";
    } else {
      console.log( "OCEAN")
      return lateralFlag = 'OCEAN'
    }
    
  }



}

 
