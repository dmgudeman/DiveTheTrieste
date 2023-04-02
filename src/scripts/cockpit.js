
class Cockpit {
   constructor (options){
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.width || window.innerWidth ;
    this.h = options.height || window.innerHeight;
    // this.cockpitImage = options.cockpitImage || document.getElementById("cockpit");

   }

   draw() {
    console.log('in cockpit draw')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // let cockpit = document.createElement('img');
    // cockpit.src = './assets/cockpit.png';
    // document.querySelector('body').appendChild(cockpit);
    this.ctx.drawImage(cockpit, this.x, this.y, this.w, this.h)
   }

}

export default Cockpit