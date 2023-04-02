
class Cockpit {
   constructor (options){
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.width || window.innerWidth ;
    this.h = options.height || window.innerHeight;
    this.cockpitImage = options.cockpitImage || document.getElementById("cockpit");

   }

   draw() {
    let random = document.createElement('img')
    random.src = 'assets/life/euphotic-pelagic/001_shark.jpg';
    this.ctx.drawImage(random, this.x, this.y, this.w, this.h)
    this.ctx.drawImage(this.cockpitImage, this.x, this.y, this.w, this.h)
   }

}

export default Cockpit