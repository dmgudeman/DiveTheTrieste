
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

  // updateDepth(y, x, d)
  // console.log (oceanBottom-sub.y-ocean.sy,"COMPOSITE")
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
    console.log('------')
    console.log (oceanBottom - ocean.sy - sub.y, 'should be less than limit up SUB')
    console.log(oceanBottom*0.50, "limit up")
    console.log('------')
    console.log((sub.y + ocean.sy), 'sub.y + ocean.sy should be less than little limit STOP ASCENT')
    console.log(ocean.surface_y, 'little limit')
    console.log('------')
   
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

 

  export function detectWindowEdge (sub, canvas) {
    

    return sub

  }