import { WIDTH, HEIGHT } from "../index";
import { LAT_LIMITS_EXT, FULL_LAT_LIMIT } from "./constants";
import { LatMoveLimit, DepthObject } from "./types";

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

    getDepthObject(lat: number): DepthObject {
        try {
            const result: DepthObject[] = LAT_LIMITS_EXT.filter(
                (obj: DepthObject) => obj.x <= lat && obj.xll >= lat
            );
            let depthObject: DepthObject = result[0];
            return depthObject;
        } catch (error) {
            console.error("calcDepth did not work for lat = ", lat);
        }
    }

    getOorS(lat: number, vert: number): string[] {
        if (lat > this.getOceanLatLimit() && vert > this.getOceanVertLimit())
            return ["O", "O"];
        if (lat < this.getOceanLatLimit() && vert > this.getOceanVertLimit())
            return ["S", "O"];
        if (lat > this.getOceanLatLimit() && vert < this.getOceanVertLimit())
            return ["O", "S"];
        if (lat < this.getOceanLatLimit() && vert < this.getOceanVertLimit())
            return ["S", "S"];
    }

    calcDepthLimit(lat: number) {
        const constants = new CalcConstant();
        const depthObject: LatMoveLimit = constants.getDepthObject(lat);
        if (!depthObject) return null;
        let startX = depthObject.xll;
        let endX = depthObject.x;
        let startY = depthObject.yll;
        let endY = depthObject.y;
        let x = lat;
        if (depthObject.id === 0) return 21;
        if (startX === endX) {
            // handles vertical line
            endX = endX + 1;
        }
        const slope = (endY - startY) / (endX - startX);
        const yIntercept = startY - slope * startX;
        const y = slope * x + yIntercept;
        return y;
    }

    // to calculate ratios lateer
    // calcX() {
    //     let lats  = [120,520,660,760,840,940,1040,1140,1240,1460,1620,2160,]
    //     let res = lats.map(el =>(el/ 3084).toFixed(3));
    //     console.log( res)
    // }
}

export default CalcConstant;
