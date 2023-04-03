
function updateDepth(y, x, el) {
//   console.log((y)*21.66, "yyyyyy in update Depth")
  // console.log(y, "yyyyyy in update Depth 2")
  // console.log(x, "XXXX in update Depth ")


 
}

function convertDepth(depth){


  return depth/21.66 + 87;
}
export function detectDepth(ocean, sub, canvas, ctx){
  const SEA_DEPTH = 36161;
  // get overall pixel coordinates of the canvas
  let bcr =canvas.getBoundingClientRect()
  console.log(bcr.width, bcr.height, "bcrWidth, bcrHeight")
  let oceanBottom = bcr.height;
  let oceanRight = bcr.width;
  let surface_y = sub.initalDepthPosition;
  let conversion =SEA_DEPTH/oceanBottom;
  console.log(conversion)
  let depth = Math.floor(conversion + surface_y );
  let d = document.getElementById("depth");
  d.innerHTML = `Depth: ${depth }feet`;
  




   d.innerText =`${sub.x}`
    // console.log(`{OCEAN x = ${ocean.sx}, y= ${ocean.sy}`)
    // console.log(`{SUB x = ${sub.x}, SUBy= ${sub.y}`)

    let x = ocean.sx;
    let y = ocean.sy;
   

    // console.log(x, "x")
    // console.log(y, "y")
    //  console.log(depth, "detect depth")
    //  ocean.dx = 20;
    //  ocean.dy = 20;
    updateDepth(y, x, d)
  
    // if (ocean.sy < 0){ ocean.sy = 0; ocean.dx= 5; ocean.dy = 0; sub.x =+ 100}
    // else if (ocean.sy > 840){ocean.sy = 840; }
    // else if (ocean.sx > 1720){ocean.sx = 1720;}
    // else if (ocean.sx < 0){ocean.sx = 0;}

    // if (sub.x <= 1200)                  {ocean.dx = 0}
    // if (depth > 3000)   {ocean.dy = 0}

    // else if  (sub.x < 1175 && sub.y > 165)  {sub.x = 1200;}
    // else if  (sub.x < 1220 && sub.y > 257)  {sub.x = 1220; y=257;} 
    // else if  (sub.x + sub.w  > canvas.width){
    // sub.x = canvas.width
    // //surface
    // } else if (sub.y < 0) {
    //   sub.y = 0
    //   //bottom
    // } else if (sub.y > canvas.heigth) {
      
    //   sub.x > canvas.heigth
    // }
    return sub;
  }

  export function detectWindowEdge (sub, canvas) {
    

    return sub

  }