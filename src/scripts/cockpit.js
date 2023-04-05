
import Images from './images';

class Cockpit {
   constructor (options){
      this.ctx = options.ctx;
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.w = options.width || window.innerWidth ;
      this.h = options.height || window.innerHeight;
      this.cockpitImage = options.cockpitImage || document.getElementById("cockpit");
      this.cockpitImageUrl = options.cockpitImageUrl || 'assets/cockpit.png'
      this.imageUrls = options.imageUrls
      this.underImageUrl = options.underImageUrl || 'assets/life/ep/001_shark.jpg'
      this.images = new Images({});
   }
    
   draw() {
      // make first image
      let ui = new Image();
      ui.src = this.images.pickRandomImage();
      ui.onload = () => {
         this.ctx.drawImage(ui, this.w*0.2, 0, this.w*0.7, this.h*0.81)

         // on load of first image, make the second image
         let cpi = new Image();
         cpi.src = this.cockpitImageUrl
         cpi.onload = () => {
            this.ctx.drawImage(cpi, this.x, this.y, this.w, this.h)
         }
      }
   }  

}

export default Cockpit