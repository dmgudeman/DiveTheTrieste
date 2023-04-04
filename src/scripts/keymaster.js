// ;(function(global){



// })(this);
import {detectDepth, detectLateral} from './boundary';
// import Sub from './sub';
// import Ocean from './ocean';

class Keymaster {

    constructor(options) {

        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.sub = options.sub;
        this.ocean = options.ocean;

    }
    getBottom(){
        let bcr = this.canvas.getBoundingClientRect();
        let oceanBottom = bcr.height;
        
        console.log(oceanBottom, "ocean bottom in keymaster")
        return oceanBottom;

    }
    getRight(){ 
        let bcr = this.canvas.getBoundingClientRect();
        let oceanRight = bcr.width;
        
        console.log(oceanRight, "ocean RIGHT in keymaster")
        return oceanRight;

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
            this.sub.vely = 0
            this.sub.y === this.getBottom();
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
            this.sub.x === this.getRight();
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
    //     if(!depthFlag){
    //       if (dir === 'down'){
    //         this.ocean.vely += 1
    //         this.ocean.sy += this.ocean.vely;
    //       } else if ( dir === 'right'){
    //         this.ocean.velx += 1;
    //         this.ocean.sx += this.ocean.velx;
    //       } else if ( dir === 'left'){
    //         this.ocean.sx -= 10;
    //       } else {
    //         this.ocean.sy -= 10;
    //       }
    //     }
      
    //    else{
        
    //       if (dir === 'down'){
    //       this.sub.vely += 1
    //       this.sub.y +=sub.vely;
    //       } else if ( dir === 'right'){
    //       this.sub.velx += 1;
    //       this.sub.x +=sub.velx;
    //       } else if ( dir === 'left'){
    //       this.sub.x -= 10;
    //       } else {
    //       this.sub.y -= 10;
    //       }
        }
    //     // detectWindowEdge(sub, canvasEl);
 
export default Keymaster;

