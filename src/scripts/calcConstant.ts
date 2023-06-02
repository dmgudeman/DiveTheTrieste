import { WIDTH, HEIGHT } from "../index";
import {
    EUPHOTIC_PELAGIC,
    EUPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
} from "./constants";
import { LAT_LIMITS_EXT, FULL_LAT_LIMIT, VERTICAL_VELOCITY, textObjects } from "./constants";
import { LatMoveLimit, DepthObject, ITextObject } from "./types";


class CalcConstant {
    private width: number;
    private height: number;
    private textObjects: ITextObject[];

    constructor() {
        this.width = WIDTH;
        this.height = HEIGHT;
        this.textObjects = textObjects
    }

    getOceanLatLimit() {
        return this.roundDownToNearestVel(this.width * -0.45);
    }
    getFullLatLimit() {
        return this.roundDownToNearestVel(this.width * -0.7);
    }
    getOceanVertLimit() {
        return this.roundDownToNearestVel(this.height * -0.55);
    }

    getZone(vert: number, depth: number): number {
        console.log("vert  depth", vert, depth);

        if (vert > this.roundDownToNearestVel(this.height * -0.211)) {
            if (vert - depth > 2 * VERTICAL_VELOCITY) {
                return EUPHOTIC_PELAGIC;
            } else {
                return EUPHOTIC_BENTHIC;
            }
        } else if (vert > this.roundDownToNearestVel(this.height * -0.45)) {
            if (vert - depth > 2 * VERTICAL_VELOCITY) {
                return DYSPHOTIC_PELAGIC;
            } else {
                return DYSPHOTIC_BENTHIC;
            }
        } else {
            if (vert - depth > 1 * VERTICAL_VELOCITY) {
                return APHOTIC_PELAGIC;
            } else {
                return APHOTIC_BENTHIC;
            }
        }
    }

    getFullVertLimit() {
        return this.roundDownToNearestVel(this.height * -0.95);
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
        if (lat >= this.getOceanLatLimit() && vert >= this.getOceanVertLimit())
            return ["O", "O"];
        if (lat < this.getOceanLatLimit() && vert >= this.getOceanVertLimit())
            return ["S", "O"];
        if (lat >= this.getOceanLatLimit() && vert < this.getOceanVertLimit())
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
        let ans = Math.floor(y / VERTICAL_VELOCITY) * VERTICAL_VELOCITY; // round down to the nearest velocity
        return ans;
    }

    roundDownToNearestVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }

    // to calculate ratios lateer
    // calcX() {
    //     let lats  = [120,520,660,760,840,940,1040,1140,1240,1460,1620,2160,]
    //     let res = lats.map(el =>(el/ 3084).toFixed(3));
    //     console.log( res)
    // }
    getTextObject(num: number) {
        return  textObjects[num]
    }
    printCalcConstant = (lat: number, vert: number, where: string) => {
        console.log(`=${where}==============`);
        console.log("OorS", this.getOorS(lat, vert));
        console.log("depthObjectName", this.getDepthObject(lat));
        console.log("========================");
        console.log("                           ");
    };
}

export default CalcConstant;
