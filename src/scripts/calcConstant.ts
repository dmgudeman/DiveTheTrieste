import {
    EUPHOTIC_PELAGIC,
    EUPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    MAP_POINTS,
    MAP_POINT_OBJECTS,
    VERTICAL_VELOCITY,
    textObjects
    
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { ITextObject, IMapPointObject } from "./types";
import InitialValues from "./initialValues";
import CalcPosition from "./calcPosition";

class CalcConstant {
    private initialValues: InitialValues;
    private calcPosition: CalcPosition;
  
   
    private textObjects: ITextObject[];

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.calcPosition = CalcPosition.getInstance();
        this.textObjects = textObjects;
    }

    // _getCompLat(ocean: Ocean, sub: Sub) {
    //     return ocean.getX() - sub.getX() + this.initialValues.getInitial_X();
    // }
    // _getCompVert(ocean: Ocean, sub: Sub) {
    //     return ocean.getY() - sub.getY() + this.initialValues.getInitial_Y();
    // }

    _getZone(vert: number, depth: number): number {
        // returns the photic zone based on depth

        if (vert > this.initialValues.getHeight() * -0.211) {
            if (vert - depth > 2 * VERTICAL_VELOCITY) {
                return EUPHOTIC_PELAGIC;
            } else {
                return EUPHOTIC_BENTHIC;
            }
        } else if (vert > this.initialValues.getHeight() * -0.45) {
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

    // setMapPointCoeffs () {
    //     let width = this.initialValues.getWidth();
    //     let height = this.initialValues.getHeight();

    //     for(let i = 0; i < MAP_POINTS.length; i++) {

    //         MAP_POINT_OBJECTS[i].coeff[0] = MAP_POINTS[i][0] / width;
    //         MAP_POINT_OBJECTS[i].coeff[1] = MAP_POINTS[i][1] / height;
    //         // console.log(i, 'lat coeff', MAP_POINT_COEFFS[i][0]);
    //         // console.log(i, 'lat obj', MAP_POINT_OBJECTS[i].coeff[0])
    //         // // console.log(i, 'vert coeff', MAP_POINT_COEFFS[i][1]);
    //         // console.log(i, 'vert obj', MAP_POINT_OBJECTS[i].coeff[1])

    //     }
    // }

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

    getMapPointObject(): IMapPointObject {
        let lastObject: IMapPointObject
        let currentObject: IMapPointObject;
        let lat = this.calcPosition.getCompLat();
        try {
            for (let i = 1; i < MAP_POINT_OBJECTS.length - 1; i++) {
                let lastMapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i - 1].coeff
                );
                let currentPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i].coeff
                );
              
               

                if (lastMapPoints[0] >= lat && currentPoints[0] < lat) {
                    currentObject = MAP_POINT_OBJECTS[i];
                    console.log('$$$$$$$$$$$$$')
                    console.log('CURRENTPOINTS', currentPoints)
                    console.log('lastMapPoints[0]', lastMapPoints[0])
                    console.log('currentPoints[0]', currentPoints[0])
                    console.log('nextMapPointsX < lat', currentPoints[0] < lat)
                    // console.log('mapPointX => lat', mapPoints[0] >= lat)
                    console.log('LLLAAATTT', lat, 'iiiiiiii', i)
                    console.log('$$$$$$$$$$$$$')
                }
            }
          

            console.log("====RESULT======");
            console.log('INITIAL X', this.initialValues.getInitial_X())
            console.log('INITAIL Y',  this.initialValues.getInitial_Y())
            console.log('VVVVVERT', this.calcPosition.getCompVert());
            // console.log('varDepth', this._calcDepthLimit2())
            console.log('ratio', (this.calcPosition.getCompVert()/this.initialValues.height))
            console.log("CHOSEN IN GET MAPPOINT OBJECT", currentObject.name);
            console.log('point[1]', currentObject.point[1], 'coeff[1]', currentObject.coeff[1])
            console.log('point[0]', currentObject.point[0], 'coeff[0]', currentObject.coeff[0])
            console.log("====++++======");
            return currentObject;
        } catch (error) {
            console.error("getMapPointObject did not work for lat = ", lat);
        }
    }

    calcPoint(coeff: number[]) {
        let result = [];
        result[0] = Math.floor(coeff[0] * this.initialValues.getWidth());
        result[1] = Math.floor(coeff[1] * this.initialValues.getHeight());
        return result;
    }

    getDistCAtoTrench() {
        return MAP_POINT_OBJECTS[10].point[0];
    }

    getOorS(): string[] {
        let lat = this.calcPosition.getCompLat();
        let vert = this.calcPosition.getCompVert();

        if (
            lat >= this.initialValues.getOceanLatLimit() &&
            vert >= this.initialValues.getOceanVertLimit()
        ) {
            return ["O", "O"];
        }
        if (
            lat < this.initialValues.getOceanLatLimit() &&
            vert >= this.initialValues.getOceanVertLimit()
        ) {
            return ["S", "O"];
        }
        if (
            lat >= this.initialValues.getOceanLatLimit() &&
            vert < this.initialValues.getOceanVertLimit()
        ){

            return ["O", "S"];
        }
        if (
            lat < this.initialValues.getOceanLatLimit() &&
            vert < this.initialValues.getOceanVertLimit()
        ){

            return ["S", "S"];
        }
    }

    _calcDepthLimit2() {
        console.log("====RESULT======");
        console.log("compVeert", this.calcPosition.getCompVert())
        console.log("NAAAAMMMMMMEEEEE", this.getMapPointObject().name);
        console.log("====++++======");

        const index = this.getMapPointObject().id;
        const mapPointObject: IMapPointObject = MAP_POINT_OBJECTS[index];
        if (!mapPointObject) return null;
        const nextMapPointObject: IMapPointObject =
            MAP_POINT_OBJECTS[index + 1];

        let startX = mapPointObject.coeff[0] * this.initialValues.getWidth();
        let endX = nextMapPointObject.coeff[0] * this.initialValues.getWidth();
        // console.log("getIitial_x", this.initialValues.getInitial_X());
        // console.log("COMPLAT", this.calcPosition.getCompLat());
        // console.log("nextMapPointObject.coeff[0]", nextMapPointObject.coeff[0]);
        // console.log("nextMapPointObject.coeff[1]", nextMapPointObject.coeff[1]);
        // console.log("START X ", startX);
        // console.log("END X", endX);
        let startY = nextMapPointObject.coeff[1] * this.initialValues.getHeight();

        let endY = mapPointObject.coeff[1] * this.initialValues.getHeight();
        // console.log('END Y', endY)
        // console.log('START Y ', startY)
        let x =  this.calcPosition.getCompLat();

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

    getTextObject(num: number) {
        return textObjects[num];
    }

    setCoeffOnMapPoinObjects() {}
}

export default CalcConstant;
