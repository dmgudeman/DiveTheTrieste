import Ocean from './ocean';
import Sub from './sub';


class OceanView {
     constructor (options){
        this.ctx = options.ctx;
        this.canvas = options.ctx.canvas;
        this.canvasOV = document.getElementById('canvas2');
        this.ctxOv = canvas.getContext("2d");

     }

     draw() {
        this.canvasOV.width = this.canvas.width;
        this.canvasOV.height = this.canvas.height;

        
     }

   







}

