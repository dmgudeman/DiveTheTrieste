
import {WIDTH, HEIGHT} from '../index';

class CalcConstant {

    private width: number;
    private height: number;
    
  
    constructor() {
      this.width = WIDTH;
      this.height = HEIGHT;   
    }

    getOceanLatLimit () {
        return this.width *(-0.45);
    }
    getFullLatLimit() {
        return this.width *(-0.7)
    }


    calcDepth(lat:number) {

        

    }
   
}

export default CalcConstant;