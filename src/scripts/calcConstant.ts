import { WIDTH, HEIGHT } from "../index";
import { LAT_LIMITS } from "./constants";
import { LatMoveLimit } from "./types";

class CalcConstant {
    private width: number;
    private height: number;

    constructor() {
        this.width = WIDTH;
        this.height = HEIGHT;
    }

    getOceanLatLimit() {
        return this.width * -0.45;
    }
    getFullLatLimit() {
        return this.width * -0.7;
    }
    getOceanVertLimit() {
        return this.height * -0.55;
    }

    getFullVertLimit() {
        return this.height * -0.95;
    }

    getDepthObject(lat: number): LatMoveLimit {
        try {
            const result = LAT_LIMITS.filter(
                (obj) => obj.x <= lat && obj.xll >= lat
            );
            let depthObject = result[0];
            return depthObject;
        } catch (error) {
            console.error("calcDepth did not work for lat = ", lat);
        }
    }
  

   // to calculate ratios lateer
    // calcX() {
    //     let lats  = [120,520,660,760,840,940,1040,1140,1240,1460,1620,2160,]
    //     let res = lats.map(el =>(el/ 3084).toFixed(3));
    //     console.log( res)


    // }
}

export default CalcConstant;
