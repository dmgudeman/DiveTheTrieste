

class Sub {

    constructor(options) {
        this.ctx = options.ctx;
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
    }

    makeSub = ()=>{

    }
   
    draw = () => {
        // this.ctx.drawImage(this.subImage,this.x, this.y)
        this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h)
    }








 
}

export default Sub;