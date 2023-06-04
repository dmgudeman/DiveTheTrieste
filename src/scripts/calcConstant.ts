import { WIDTH, HEIGHT } from "../index";
import {
    EUPHOTIC_PELAGIC,
    EUPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS
} from "./constants";
import Ocean from './ocean';
import Sub from './sub';
import { LAT_LIMITS_EXT, FULL_LAT_LIMIT, VERTICAL_VELOCITY, textObjects, MAP_POINTS} from "./constants";
import { LatMoveLimit, DepthObject, ITextObject, IMapPointObject } from "./types";


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

    _getCompLat(ocean:Ocean, sub:Sub) {
        return ocean.getX() - sub.getX() + SUB_INITIAL_LAT_POS

    }
    _getCompVert(ocean:Ocean, sub:Sub) {
         return ocean.getY() - sub.getY() + INITIAL_Y_POSITION 
    }

    _getZone(vert: number, depth: number): number {  // returns the photic zone based on depth

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

    getMapPointObject(lat: number): IMapPointObject {
        let result:IMapPointObject;
        try {
            for (let i = 0; i < MAP_POINTS.length - 1; i++) {
                if (MAP_POINTS[i].point[0] >= lat && MAP_POINTS[i + 1].point[0] < lat) {
                 result = MAP_POINTS[i];
                }
              }
            
              return result;
        } catch (error) {
            console.error("calcDepth did not work for lat = ", lat);
        }
    }

   
    getDistCAtoTrench(){
        return LAT_LIMITS_EXT[10].x
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

    _calcDepthLimit(lat: number) {
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
    _calcDepthLimit2(lat: number) {
        const constants = new CalcConstant();
        const index = constants.getMapPointObject(lat).id;
        const mapPointObject: IMapPointObject = MAP_POINTS[index];
        if (!mapPointObject) return null;
        const prevMapPointObject: IMapPointObject = MAP_POINTS[index -1]
        console.log('MMMAAAAPPPPOINTOBJECT', mapPointObject)
        console.log('PPPPPPP', prevMapPointObject)
     
        let startX = prevMapPointObject.point[0];
        let endX = mapPointObject.point[0];
        let startY = prevMapPointObject.point[1];
        let endY = mapPointObject.point[1];
        let x = lat;
        // if (depthObject.id === 0) return 21;
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
    getPreviousMapPointObject(num:number):IMapPointObject {
        let result = MAP_POINTS.filter( mapPoint => mapPoint.id === num -1);
        return result[0];
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
