
function updateDepth(y, x,el) {
//   console.log((y)*21.66, "yyyyyy in update Depth")
  // console.log(y, "yyyyyy in update Depth 2")
  // console.log(x, "XXXX in update Depth ")


  el.innerHTML = `Depth: ${Math.floor((y-87)*21.66)} feet`;
}

function convertDepth(depth){

  console.log(depth/21.66 + 87, 'MMMMMMMMMMMMMMM')
  return depth/21.66 + 87;
}
export function detectDepth(sub, canvas ){
  let d = document.getElementById("depth");
  //  d.innerText =`${sub.x}`
    // console.log(`{x = ${sub.x}, y= ${sub.y}`)
    let x = sub.x;
    let y = sub.y;
    let depth = Math.floor((y-87)*21.66);

    console.log(x, "x")
    console.log(y, "y")
     console.log(depth, "detect depth")

    updateDepth(sub.y, sub.x, d)
  
    if       (depth < 0 )                  {  console.log(sub.vely); sub.y = 87}

    if (sub.x <= 1200)                  {sub.dx = 0}
    if (depth > 3000)   {sub.dy = 0}

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