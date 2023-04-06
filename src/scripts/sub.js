

class Sub {

    constructor(options) {
        this.ctx = options.ctx;
        this.canvas = this.ctx.canvas;
        this.x = options.x || 900;
        this.y = options.y || 80;
        this.w = options.width || 100 ;
        this.h = options.height || 100;
        this.velx = options.velx || 5;
        this.vely = options.vely || 5;
        this.dx = options.velx || 0
        this.dy = options.vely || 0;
        this.subImage = options.subImage || document.getElementById("sub");
        this.initialLateralPos = options.initialLateralPos || 900;
        this.initialDepthPos = options.initialDepthPos || 80;
        this.subDepthFlag = 'SUB';
        this.subLateralFlag = 'SUB';
        this.subDepthLimit = options.subDepthLimit || 820;
        this.subLateralLimit = options.subLateralLimit || 1700;
        // this.spriteSheet =  this.makeSprite();
        this.canvasSub = document.getElementById("canvas3")
        this.ctxSub = canvas3.getContext('2d')
        // this.canvasSub.width = this.canvas.width;
        // this.canvasSub.height = this.canvas.height;
      
        this.spriteSheet = document.getElementById('sprite') || '';
      
    }

    clickHandler (e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
      
        // Check if the click was inside the image
        if (x > 0 && x < this.width && y > 0 && y < this.height) {
          console.log("Image clicked!");
        }
    }
   
    draw () {
        // // this.ctx.drawImage(this.subImage,this.x, this.y)
        this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h)
        this.ctx.canvas.addEventListener("click", this.clickHandler)
        
    }

    styleSprite() {
       this.spriteSheet.setAttribute.style.zIndex = 110;
    }
    
    draw2() {

        let sprites = [
        { x: 0, y: 0, width: 125, height: 200 },
        { x: 135, y: 0, width: 135, height: 200 },
        { x: 280, y: 0, width: 125, height: 200 },
        { x: 410, y: 0, width: 140, height: 200 },
        // add more sprites here
        ];
        
        // this.canvasSub.width = 1000;
        // this.canvasSub.height = 1000;
        // this.ctx.drawImage(this.spriteSheet, 0, 0, 500, 500);
        // this.canvasSub.width = sprites[0].width;
        // this.canvasSub.height = sprites[0].height;
    //     let currentFrame = 0;
        
    //     let lastFrameTime = 0; 
    //     let animate = (currentTime) => {
    //         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //         const elapsedTime = currentTime - lastFrameTime;
    //         if (elapsedTime > 1000/15) {
    //         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //         const sprite = sprites[currentFrame];
    //         this.ctx.drawImage(this.spriteSheet, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.w, this.y);
            

    //         currentFrame++;
    //         if (currentFrame >= sprites.length) {
    //             currentFrame = 0;
    //         }
    //         lastFrameTime = currentTime; 
    //         }
    //         requestAnimationFrame(animate);
    //     }
             
    //    animate();
    
   }




 
}

export default Sub;