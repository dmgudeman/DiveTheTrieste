
import Images from './images';
import {showCanvas1, showCanvas2, showCanvas3} from './util'

class Cockpit {
   constructor (options){
      this.ctx = options.ctx;
      this.canvas = this.ctx.canvas;
      // this.canvas = document.getElementById('canvas1');


    
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

    
   draw = () => {
       // Add an event listener to detect when the button is clicked
       const rect = this.canvas.getBoundingClientRect();
       this.canvas.addEventListener("click", function(event) {
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
       if (x > 100 && x < 200 && y > 100 && y < 150) {
          console.log("Rectangle clicked!");
          showCanvas1()
       }
    })
      
      //  const button = this.ctx.getImageData(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
      
      this.canvas.style.zIndex = '50';
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
            cpi.style.zIndex = 55
            let rectangle = {x:100, y:100, width: 100, height: 50}
            this.ctx.fillStyle = "#4CAF50";
            this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
           
         
              
         }
     
      }

      
         
     
   }

   // makeButton() {
   //    let rectangle = {x:100, y:100, width: 100, height: 50}
   //    this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
   //    this.ctx.fillStyle = "#4CAF50";
   
   //       // Add an event listener to detect when the button is clicked
   //       const rect = this.canvas.getBoundingClientRect();
   //       this.canvas.addEventListener("click", function(event) {
   //          const x = event.clientX - rect.left;
   //          const y = event.clientY - rect.top;
   //       if (x > 100 && x < 200 && y > 100 && y < 150) {
   //          console.log("Rectangle clicked!");
   //       }
   //    })
   // }
}

export default Cockpit