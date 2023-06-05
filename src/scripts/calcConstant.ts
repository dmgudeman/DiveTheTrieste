import { WIDTH, HEIGHT } from "../index";
import {
    EUPHOTIC_PELAGIC,
    EUPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
  
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import {
    VERTICAL_VELOCITY,
    textObjects,
    MAP_POINT_OBJECTS,
} from "./constants";
import {
    LatMoveLimit,
    DepthObject,
    ITextObject,
    IMapPointObject,
} from "./types";
import InitialValues from "./initialValues";


class CalcConstant {
    private initialValues: InitialValues;
    private width: number;
    private height: number;
    private textObjects: ITextObject[];

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.width = WIDTH;
        this.height = HEIGHT;
        this.textObjects = textObjects;
        
    }

    getOceanLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.45);
    }
   
    getOceanVertLimit() {
        return this.roundDownToNearestVertVel(this.height * -0.55);
    }

  

    _getCompLat(ocean: Ocean, sub: Sub) {
        return ocean.getX() - sub.getX() + this.initialValues.getInitial_X();
    }
    _getCompVert(ocean: Ocean, sub: Sub) {
        return ocean.getY() - sub.getY() + this.initialValues.getInitial_Y();
    }

    _getZone(vert: number, depth: number): number {
        // returns the photic zone based on depth

        if (vert > this.roundDownToNearestVertVel(this.height * -0.211)) {
            if (vert - depth > 2 * VERTICAL_VELOCITY) {
                return EUPHOTIC_PELAGIC;
            } else {
                return EUPHOTIC_BENTHIC;
            }
        } else if (vert > this.roundDownToNearestVertVel(this.height * -0.45)) {
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

   

    // getDepthObject(lat: number): DepthObject {
    //     try {
    //         const result: DepthObject[] = LAT_LIMITS_EXT.filter(
    //             (obj: DepthObject) => obj.x <= lat && obj.xll >= lat
    //         );
    //         let depthObject: DepthObject = result[0];
    //         return depthObject;
    //     } catch (error) {
    //         console.error("calcDepth did not work for lat = ", lat);
    //     }
    // }

    getMapPointObject(lat: number): IMapPointObject {
        let result: IMapPointObject;

        try {
            for (let i = 0; i < MAP_POINT_OBJECTS.length - 1; i++) {
                let mapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i].coeff
                );
                let nextMapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i + 1].coeff
                );
                // console.log('mapPoints[0]', mapPoints[0], 'nextMapPoints[0]', nextMapPoints[0])
                // console.log('nextMapPoints[0] < lat', nextMapPoints[0] < lat)
                // console.log('mapPoints[0] => lat', mapPoints[0] >= lat)
                // console.log('LLLAAATTT', lat, 'iiiiiiii', i)

                if (nextMapPoints[0] < lat && mapPoints[0] >= lat) {
                    result = MAP_POINT_OBJECTS[i + 1];
                  
               
                }
               
            }
            console.log('====RESULT======')
            console.log(result)
            console.log('====++++======')
            return result;
        } catch (error) {
            console.error("getMapPointObject did not work for lat = ", lat);
        }
    }

    calcPoint(coeff: number[]) {
        let result = [];
        result[0] = Math.floor(coeff[0] * this.width);
        result[1] = Math.floor(coeff[1] * this.height);
        return result;
    }

    getDistCAtoTrench() {
        return MAP_POINT_OBJECTS[10].point[0];
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

    // _calcDepthLimit(lat: number) {
    //     const constants = new CalcConstant();
    //     const depthObject: LatMoveLimit = constants.getDepthObject(lat);
    //     if (!depthObject) return null;
    //     let startX = depthObject.xll;
    //     let endX = depthObject.x;
    //     let startY = depthObject.yll;
    //     let endY = depthObject.y;
    //     let x = lat;
    //     if (depthObject.id === 0) return 21;
    //     if (startX === endX) {
    //         // handles vertical line
    //         endX = endX + 1;
    //     }
    //     const slope = (endY - startY) / (endX - startX);
    //     const yIntercept = startY - slope * startX;
    //     const y = slope * x + yIntercept;
    //     let ans = Math.floor(y / VERTICAL_VELOCITY) * VERTICAL_VELOCITY; // round down to the nearest velocity
    //     return ans;
    // }
    _calcDepthLimit2(lat: number) {
        const constants = new CalcConstant();

        console.log('LATTTTTTT', lat)
        const index = constants.getMapPointObject(lat).id;
        const mapPointObject: IMapPointObject = MAP_POINT_OBJECTS[index];
        if (!mapPointObject) return null;
        const nextMapPointObject: IMapPointObject =
            MAP_POINT_OBJECTS[index + 1];

        let startX = nextMapPointObject.coeff[0] * WIDTH;
        let endX = mapPointObject.coeff[0] * WIDTH;
        // console.log('END X', endX)
        // console.log('START X ', startX)
        let startY = nextMapPointObject.coeff[1] * HEIGHT;

        let endY = mapPointObject.coeff[1] * HEIGHT;
        // console.log('END Y', endY)
        // console.log('START Y ', startY)
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
    getPreviousMapPointObject(num: number): IMapPointObject {
        let result = MAP_POINT_OBJECTS.filter(
            (mapPoint) => mapPoint.id === num - 1
        );
        return result[0];
    }
    roundDownToNearestLatVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }

    roundDownToNearestVertVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }

    // to calculate ratios lateer
    // calcX() {
    //     let lats  = [120,520,660,760,840,940,1040,1140,1240,1460,1620,2160,]
    //     let res = lats.map(el =>(el/ 3084).toFixed(3));
    //     console.log( res)
    // }
    getTextObject(num: number) {
        return textObjects[num];
    }
    printCalcConstant = (lat: number, vert: number, where: string) => {
        console.log(`=${where}==============`);
        console.log("OorS", this.getOorS(lat, vert));

        console.log("========================");
        console.log("                           ");
    };
}

export default CalcConstant;
