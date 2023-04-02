
function updateDepth(y,el) {
  console.log((y-167)*21.66, "yyyyyy")
  el.innerHTML = `Depth: ${Math.floor((y-137)*21.66)} feet`;
}
export function detectDepth(sub, canvas ){
  let d = document.getElementById("depth");
  //  d.innerText =`${sub.x}`
    // console.log(`{x = ${sub.x}, y= ${sub.y}`)
    updateDepth(sub.y, d)
    let x = sub.x;
    let y = sub.y;
  
  
    if       (sub.y < 125 )                  {sub.y = 125}
    if       (sub.x < 1200)                  {sub.x = 1200}

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