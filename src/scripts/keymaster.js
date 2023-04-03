// ;(function(global){



// })(this);
import {detectDepth, detectWindowEdge} from './boundary';
import Sub from './sub';
import Ocean from './ocean';

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

    }

    newPos(dir){
        console.log("keymasterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", dir)

       let depthFlag =  detectDepth( this.ocean, this.sub, this.canvas);

    if (dir === 'down') {
        console.log("keymasterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", dir)
        console.log(depthFlag)
        if(depthFlag === 'MOVE') {
            this.ocean.vely += 1
            this.ocean.sy += this.ocean.vely;
            return this.ocean
        } else if (depthFlag === 'SWITCH_TO_SUB'){
            this.sub.vely += 1
            this.sub.y += this.sub.vely;
            return this.sub
        } else if (depthFlag === 'STOP_DESCENT')
            this.sub.vely = 0
            this.sub.y === this.getBottom();
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

