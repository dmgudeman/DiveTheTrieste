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
import { VERTICAL_VELOCITY, textObjects, MAP_POINT_OBJECTS } from "./constants";
import { ITextObject, IMapPointObject } from "./types";
import InitialValues from "./initialValues";
import CalcPosition from "./calcPosition";

class CalcConstant {
    private initialValues: InitialValues;
    private calcPosition: CalcPosition;
    private width: number;
    private height: number;
    private textObjects: ITextObject[];

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.calcPosition = new CalcPosition();
        this.textObjects = textObjects;
    }

    _getCompLat(ocean: Ocean, sub: Sub) {
        return ocean.getX() - sub.getX() + this.initialValues.getInitial_X();
    }
    _getCompVert(ocean: Ocean, sub: Sub) {
        return ocean.getY() - sub.getY() + this.initialValues.getInitial_Y();
    }

    _getZone(vert: number, depth: number): number {
        // returns the photic zone based on depth

        if (vert > this.height * -0.211) {
            if (vert - depth > 2 * VERTICAL_VELOCITY) {
                return EUPHOTIC_PELAGIC;
            } else {
                return EUPHOTIC_BENTHIC;
            }
        } else if (vert > this.height * -0.45) {
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

    getMapPointObject(): IMapPointObject {
        let endPoint: IMapPointObject;
        let lat = this.calcPosition.getCompLat();
        console.log("LATTTT", this.calcPosition.getCompLat());

        try {
            for (let i = 1; i < MAP_POINT_OBJECTS.length - 1; i++) {
                let startMapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i - 1].coeff
                );
                let endMapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i].coeff
                );

                // console.log('startMapPoints[0]', startMapPoints[0])
                // console.log('nextMapPointsX < lat', nextMapPoints[0] < lat)
                // console.log('mapPointX => lat', mapPoints[0] >= lat)
                // console.log('LLLAAATTT', lat, 'iiiiiiii', i)

                if (startMapPoints[0] >= lat && endMapPoints[0] < lat) {
                    endPoint = MAP_POINT_OBJECTS[i];
                    // console.log('ENDPOINT', endPoint)
                }
            }
            // console.log("====RESULT======");
            // console.log('INITIAL X', this.initialValues.getInitial_X())
            // console.log('INITAIL Y',  this.initialValues.getInitial_Y())

            // console.log('VVVVVERT', this.calcPosition.getCompVert());
            // // console.log('varDepth', this._calcDepthLimit2())
            // console.log('ratio', (this.calcPosition.getCompVert()/this.initialValues.height))
            // console.log("CHOSEN IN GET MAPPOINT OBJECT", endPoint.name);
            // console.log('point[1]', result.point[1], 'coeff[1]', result.coeff[1])
            // console.log('point[0]', result.point[0], 'coeff[0]', result.coeff[0])
            // console.log("====++++======");
            return endPoint;
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
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOrs lat ", lat);
        console.log(
            " lat >= this.initialValues.getOceanLatLimit()",
            lat >= this.initialValues.getOceanLatLimit()
        );

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
            console.log("SSSSSSSSSSSSSSSSSSSS oors lat ", lat);
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
        console.log("", this.getMapPointObject().name);

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
        // console.log("START X ", startX);
        // console.log("END X", endX);
        // let startY = nextMapPointObject.coeff[1] * this.initialValues.getHeight();

        // let endY = mapPointObject.coeff[1] * this.initialValues.getHeight();
        // console.log('END Y', endY)
        // console.log('START Y ', startY)
        // let x = lat;

        // if (startX === endX) {
        //     // handles vertical line
        //     endX = endX + 1;
        // }
        // const slope = (endY - startY) / (endX - startX);
        // const yIntercept = startY - slope * startX;
        // const y = slope * x + yIntercept;
        // let ans = Math.floor(y / VERTICAL_VELOCITY) * VERTICAL_VELOCITY; // round down to the nearest velocity
        // return ans;
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
