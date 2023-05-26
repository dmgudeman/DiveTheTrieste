import {
    INITIAL_Y_POSITION, 
    SUB_INITIAL_LAT_POS,
    LAT_VELOCITY,
    VERTICAL_VELOCITY
} from './constants';

class Sub {

    constructor(options) {
        // this.ctx = options.ctx;
        // this.canvas = this.ctx.canvas;
        this.x = options.x || SUB_INITIAL_LAT_POS;
        this.y = options.y || INITIAL_Y_POSITION;
        this.w = options.width || 120 ; // size of the sub in px
        this.h = options.height || 120;  // size of the sub in px
        this.vely = options.vely || VERTICAL_VELOCITY;
        this.velx = options.velx || LAT_VELOCITY;
        this.velRight = options.velRight || LAT_VELOCITY;
        this.velLeft = options.velLeft || LAT_VELOCITY;
        this.velUp = options.velUp || VERTICAL_VELOCITY;
        this.velDown = options.velDown || VERTICAL_VELOCITY;
        this.dx = options.velx || 0;
        this.dy = options.vely || 0;
        // this.subImage = options.subImage || document.getElementById("sub");
        this.initialLateralPos = options.initialLateralPos || SUB_INITIAL_LAT_POS;
        this.initialDepthPos = options.initialDepthPos || INITIAL_Y_POSITION;
        // this.subDepthFlag = 'SUB';
        // this.subLateralFlag = 'SUB';
        this.subDepthLimit = options.subDepthLimit || 820;
        this.subLateralLimit = options.subLateralLimit || 1700;
        // this.spriteSheet =  this.makeSprite();
        // this.canvasSub = document.getElementById("canvas3")
        // this.ctxSub = canvas3.getContext('2d')
        // this.spriteSheet = document.getElementById('sprite') || '';
    }

    // clickHandler (e) {
    //     const rect = this.canvas.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;
      
    //     // Check if the click was inside the image
    //     if (x > 0 && x < this.width && y > 0 && y < this.height) {
    //     }
    // }
   
    draw () {
        // // this.ctx.drawImage(this.subImage,this.x, this.y)
        this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h)
        // this.ctx.canvas.addEventListener("click", this.clickHandler)
        
    }
}

export default Sub;

    // styleSprite() {
    //    this.spriteSheet.setAttribute.style.zIndex = 110;
    // }
    
    // draw2() {

    //     let sprites = [
    //     { x: 0, y: 0, width: 125, height: 200 },
    //     { x: 135, y: 0, width: 135, height: 200 },
    //     { x: 280, y: 0, width: 125, height: 200 },
    //     { x: 410, y: 0, width: 140, height: 200 },
    //     // add more sprites here
    //     ];
        
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
    
//    }




 
