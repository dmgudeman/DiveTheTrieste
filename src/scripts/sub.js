import {
    INITIAL_Y_POSITION, 
    SUB_INITIAL_LAT_POS,
} from './constants';

class Sub {

    constructor(options) {
        this.x = options.x || SUB_INITIAL_LAT_POS;
        this.y = options.y || INITIAL_Y_POSITION;
        this.w = options.width || 120 ; // size of the sub in px
        this.h = options.height || 120;  // size of the sub in px
        this.vely = options.vely || 0
        this.velx = options.velx || 0
        this.velRight = options.velRight || 0
        this.velLeft = options.velLeft || 0
        this.velUp = options.velUp || 0
        this.velDown = options.velDown || 0
        this.dx = options.velx || 0;
        this.dy = options.vely || 0;
        // this.subImage = options.subImage || document.getElementById("sub"); // regular sub image
        this.initialLateralPos = options.initialLateralPos || SUB_INITIAL_LAT_POS;
        this.initialDepthPos = options.initialDepthPos || INITIAL_Y_POSITION;
        this.subDepthLimit = options.subDepthLimit || 820;
        this.subLateralLimit = options.subLateralLimit || 1700;   
    }

   
    draw () {
        this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h)     
    }
}

export default Sub;




 
