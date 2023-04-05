import {detectDepth, detectLateral, moveSubVertical} from './boundary';

class Keymaster {

    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.sub = options.sub;
        this.ocean = options.ocean;
        this.oceanRight = this.canvas.width || 4000;
        this.oceanBottom = this.canvas.height || 2000;
    }

    prepareForAscent(){
        // this.sub.vely = 
        this.ocean.vely = 0
    }


    newPos(dir){
     
        detectLateral(this.ocean, this.sub, this.canvas, dir);
        detectDepth( this.ocean, this.sub, this.canvas, dir);
        //  moveSubVertical(this.sub, dir)

        

        if (dir === 'down') {
            if(this.ocean.depthFlag === 'OCEAN') {
                this.ocean.sy += this.ocean.vely;
                // return this.ocean

            } else if (this.ocean.depthFlag === 'STOP_DESCENT'){
                this.ocean.sy = this.ocean.depthLimit;  
         
                if ( this.sub.y < this.sub.subDepthLimit){
                    this.sub.vely += 1
                    this.sub.y += this.sub.vely;
                } else {
                    this.sub.vely = 0;
                }

            }
            
        }

        // if (dir === 'down') {
        //     if (this.sub.subDepthFlag === 'SUB'){
            
        //         console.log('in good place ')
        //         this.sub.vely += 1
        //         this.sub.y += this.sub.vely;
        //         // return this.sub

        //     } else if (this.sub.depthFlag === 'STOP_SUB_DESCENT'){
        //         this.sub.vely = 0;
        //         this.subx = this.sub.depthLimit;
        //         // return this.sub;
        //     }
        // }

        
        if (dir === 'up') {

            if (this.ocean.depthFlag === 'OCEAN'){
                    this.ocean.sy -= this.ocean.vely;
                } else if (this.ocean.depthFlag === 'STOP_ASCENT'){
                    this.ocean.sy = 0;
            
                    if ( this.sub.y > this.sub.initialDepthPos){
                     
                        this.sub.vely += 1;
                        this.sub.y -= this.sub.vely;
                    } else if (this.sub.y < this.sub.initialDepthPos) {
                        this.sub.vely = 0;
                    }
                }
        }
        if (dir === 'right') {
            if(this.ocean.lateralFlag === 'OCEAN') {
                // this.ocean.velx += 1
                this.ocean.sx += this.ocean.velx;
                // return this.ocean
            // } else if (lateralFlag === 'SUB'){
            //     this.sub.velx += 1
            //     this.sub.x += this.sub.velx;
            //     return this.sub
            } else if (this.ocean.lateralFlag === 'STOP_RIGHT'){
                // this.ocean.velx = 0
                this.sub.velx = this.ocean.velx
                this.ocean.sx = this.ocean.lateralLimit;   
                if ( this.sub.x < this.sub.subLateralLimit){
                    // this.sub.velx += 1
                    // console.log(this.sub)
                    this.sub.x += this.sub.velx;
                } else {
                    this.sub.velx = 0;
                }
            
                // return this.ocean
            }
        }
        if (dir === 'left') {
            
            if(this.ocean.lateralFlag === 'OCEAN') {
                this.ocean.velx += 1
                this.ocean.sx -= this.ocean.velx;
                return this.ocean
      
            } else if (this.ocean.lateralFlag === 'STOP_LEFT'){
                this.sub.velx = this.ocean.velx
                this.ocean.sx = 0;
                if ( this.sub.x > this.sub.initialLateralPos){
                    this.sub.x -= this.sub.velx;
                } else {
                    this.sub.velx = 0;
                }
            }
        }
    }

}

 
export default Keymaster;

