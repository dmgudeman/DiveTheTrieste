
class Ocean {
    constructor(options){
      this.canvas = options.canvas;
      this.ctx = options.ctx;
      this.crossSection = options.crossSection || document.getElementById("crossSection");
    }

    draw(){
    
        this.ctx.drawImage(this.crossSection ,0,0, 4200, 2000);
    
    }

  
    
}
export default Ocean;