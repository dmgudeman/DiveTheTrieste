
import {detectDepth, detectLateral} from './boundary';

class Keymaster {

    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.sub = options.sub;
        this.ocean = options.ocean;
        console.log(this.canvas, 'im here')
        this.oceanRight = this.canvas.width || 4000;
        this.oceanBottom = this.canvas.height || 2000;
    }




    newPos(dir){
    
       let lateralFlag = detectLateral(this.ocean, this.sub, this.canvas, dir);
       let depthFlag = detectDepth( this.ocean, this.sub, this.canvas, dir);
      

    if (dir === 'down') {
        if(depthFlag === 'OCEAN') {
            this.ocean.vely += 1
            this.ocean.sy += this.ocean.vely;
            return this.ocean
        } else if (depthFlag === 'SUB'){
            this.sub.vely += 1
            this.sub.y += this.sub.vely;
            return this.sub
        } else if (depthFlag === 'STOP_DESCENT')
            this.sub.vely = 0;
            this.ocean.vely = 0;
            // this.sub.y === this.oceanBottom;
            return this.sub

    }
    
    if (dir === 'up') {
        if(depthFlag === 'SUB') {
            console.log('SUB in keymaster this.sub.y = ', this.sub.y)
            this.sub.vely += 1
            this.sub.y -= this.ocean.vely;
            return this.ocean
        } else if (depthFlag === 'OCEAN'){
            console.log('OCEAN in keymaster; this.sub.y=', this.sub.y)
            this.ocean.vely += 1
            this.ocean.sy -= this.sub.vely;
            return this.sub
        } else if (depthFlag === 'STOP_ASCENT')
            this.ocean.vely = 0
            this.ocean.sy === this.ocean.surface_y;
            return this.ocean

    }
    if (dir === 'right') {
        if(lateralFlag === 'OCEAN') {
            this.ocean.velx += 1
            this.ocean.sx += this.ocean.velx;
            return this.ocean
        } else if (lateralFlag === 'SUB'){
            this.sub.velx += 1
            this.sub.x += this.sub.velx;
            return this.sub
        } else if (lateralFlag === 'STOP_RIGHT')
            this.sub.velx = 0
            this.sub.x === this.oceanRight;
            this.ocean.vely = 0;
            return this.sub

    }
    if (dir === 'left') {
        console.log('keymaster left', lateralFlag)
        if(lateralFlag === 'OCEAN') {
            this.ocean.velx += 1
            this.ocean.sx -= this.ocean.velx;
            return this.ocean
        } else if (lateralFlag === 'SUB'){
            this.sub.velx += 1
            this.sub.x -= this.sub.velx;
            return this.sub
        } else if (lateralFlag === 'STOP_LEFT')
            this.sub.velx = 0
            this.sub.x === this.subInitialPos;
            return this.sub

    }
}

        }

 
export default Keymaster;

