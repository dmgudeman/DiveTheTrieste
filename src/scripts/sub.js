

import {clear} from './util.js';

class Sub {

    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.x = options.x || 1400;
        this.y = options.y || 167;
        this.w = options.width || 100 ;
        this.h = options.height || 100;
        this.vel = options.vel || 5;
        this.dx = options.dx || 0
        this.dy = options.dy || 0;
        this.subImage = options.subImage || document.getElementById("sub");
    }

    makeSub = ()=>{

    }
   
    draw = () => {
        // this.ctx.drawImage(this.subImage,this.x, this.y)
        this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h)
    }

    newPosition = (pos) => {
        this.x += pos[0];
        this.y += pos[1];
    }

    clear = () => {
        this.ctx.clearRect(0,0, canvas.width, canvas.height)
    }
    update =() =>{
        clear();
        // this.draw();
        let pos = this.newPosition();
        // this.draw(pos)
        // requestAnimationFrame(this.update)  
    }
}

export default Sub;