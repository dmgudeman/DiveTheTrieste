import { eventBus } from "./eventBus";
import {
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    MAP_POINT_OBJECTS,
} from "./constants";
import InitialValues from "./initialValues";
import { ITextObject, IMapPointObject } from "./types";

class CalcPosition {
    private static instance: CalcPosition;
    private initialValues: InitialValues;
    private compLat: number;
    private compVert: number;
    private oceanLat: number;
    private oceanVert: number;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private subLat: number;
    private subVert: number;

    private constructor(
        oceanLat?: number,
        oceanVert?: number,
        subLat?: number,
        subVert?: number
    ) {
        this.initialValues = InitialValues.getInstance();
        this.compLat = 0;
        this.compVert = 0;
        this.oceanLat = oceanLat || 0;
        this.oceanVert = oceanVert || 0;
        this.oceanLatLimit = this.initialValues.getOceanLatLimit();
        this.oceanVertLimit = this.initialValues.getOceanVertLimit();
        this.subLat = subLat || this.initialValues.getInitial_X();
        this.subVert = subVert || this.initialValues.getInitial_Y();
        eventBus.on("oceanXChanged", this.handleOceanXChange);
        eventBus.on("subXChanged", this.handleSubXChange);
        eventBus.on("oceanYChanged", this.handleOceanYChange);
        eventBus.on("subYChanged", this.handleSubYChange);
    }

    public static getInstance(
        oceanLat?: number,
        oceanVert?: number,
        subLat?: number,
        subVert?: number
    ): CalcPosition {
        if (!CalcPosition.instance) {
            CalcPosition.instance = new CalcPosition(
                oceanLat,
                oceanVert,
                subLat,
                subVert
            );
        }
        return CalcPosition.instance;
    }

    handleOceanXChange = (newX: number) => {
        this.oceanLat = newX;
        this.compLat =
            this.oceanLat - this.subLat + this.initialValues.getInitial_X();
        // console.log('=======CALC POSITION===============')
        // console.log("ZZ newX", newX);
        // console.log("ZZ this.coeanLat", this.oceanLat)
        // console.log('ZZ OCEAN_LAT_LIMIT', this.initialValues.getOceanLatLimit())
        // console.log('ZZ this.subLat', this.subLat)
        // console.log('ZZ Initial_X()', this.initialValues.getInitial_X())
        // console.log('ZZ .getWidth', this.initialValues.getWidth())
        // console.log('ZZ this.compLat', this.compLat)
        // console.log('ZZ FullLatLimit', this.initialValues.getFullLatLimit())
        // console.log('======================')
    };

    handleSubXChange = (newX: number) => {
        // console.log('+++++++++++++++++++++++++')
        // console.log("WWWWWWWWW newX", newX);
        this.subLat = newX;
        this.compLat =
            this.oceanLatLimit -
            this.subLat +
            this.initialValues.getInitial_X();
        // console.log('WWWWWWWWW this.oceanLat', this.oceanLat)
        // console.log('WWWWWWWWW this.subLat', this.subLat)
        // console.log('WWWWWWWWW this.initialValues.getInitial_X()', this.initialValues.getInitial_X())
        // console.log('WWWWWWWWW this.initialValues.getWidth', this.initialValues.getWidth())
        // console.log('WWWWWWWWW this.compLat', this.compLat)
        // console.log('WWWWWWWWW this.intialValues.getFullLatLimit', this.initialValues.getFullLatLimit())

        // console.log('+++++++++++++++++++++++++')
    };
    handleOceanYChange = (newY: number) => {
        this.oceanVert = newY;
        this.compVert =
            this.oceanVert - this.subVert + this.initialValues.getInitial_Y();
        // console.log('ZZZZZZZZZ Ocean CALCPOS COMPVERT', this.compVert);
    };

    handleSubYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.subVert = newY;
        this.compVert =
            this.oceanVert - this.subVert + this.initialValues.getInitial_Y();
        // console.log('ZZZZZZZZZ sub CALCPOS COMPVERT', this.compVert)
    };

    getCompLat() {
        return this.compLat;
    }

    getCompVert() {
        return this.compVert;
    }
    getSubVert() {
        return this.subVert;
    }
    getOceanVert() {
        return this.oceanVert;
    }

    getOorS(dir: string): string[] {
        let lat = this.getCompLat();
        let vert = this.getCompVert();
        let vertLimit = this.initialValues.getOceanVertLimit();
        let modVertLimit = vertLimit + VERTICAL_VELOCITY;
        console.log("== GET OORS ==", vert);
        console.log("MODLIMIT", modVertLimit);
        console.log("LIMIT", vertLimit);
        console.log("VERT >= MODLIMIT", vert >= modVertLimit);
        console.log("VERT <= MODLIMIT", vert < modVertLimit);
        console.log("OCEAN VERT", this.getOceanVert());
        console.log("SUB VERT", this.getSubVert());
        console.log("=========");
        if (dir === "right" || dir === "left")
            if (
                lat >= this.initialValues.getOceanLatLimit() &&
                vert >= vertLimit
            ) {
                console.log("RETURN [ O, O]");
                return ["O", "O"];
            }
        if (
            lat < this.initialValues.getOceanLatLimit() + LAT_VELOCITY &&
            vert >= vertLimit
        ) {
            console.log("RETURN [ S, O]");
            return ["S", "O"];
        }
        if (lat >= this.initialValues.getOceanLatLimit() && vert < vertLimit) {
            console.log("RETURN [ O, S]");
            return ["O", "S"];
        }
        if (
            lat < this.initialValues.getOceanLatLimit() + LAT_VELOCITY &&
            vert < vertLimit
        ) {
            console.log("RETURN [ S, S]");
            return ["S", "S"];
        }
    }
    getMapPointObject(): IMapPointObject {
        let lastObject: IMapPointObject;
        let currentObject: IMapPointObject;
        let lat = this.getCompLat();
        try {
            for (let i = 1; i < MAP_POINT_OBJECTS.length - 1; i++) {
                lastObject = MAP_POINT_OBJECTS[i - 1];
                let lastMapPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i - 1].coeff
                );
                let currentPoints: number[] = this.calcPoint(
                    MAP_POINT_OBJECTS[i].coeff
                );

                if (lastMapPoints[0] >= lat && currentPoints[0] < lat) {
                    currentObject = MAP_POINT_OBJECTS[i];
                    // console.log('$$$$$$$$$$$$$')console.log('lastObject.', currentPoints)
                    // console.log('currentObject.name', currentObject.name)

                    // console.log('currentPoints[0]', currentPoints[0])
                    // console.log('nextMapPointsX < lat', currentPoints[0] < lat)
                    // // console.log('mapPointX => lat', mapPoints[0] >= lat)
                    // console.log('LLLAAATTT', lat, 'iiiiiiii', i)
                    // console.log('$$$$$$$$$$$$$')
                }
            }

            // console.log("====RESULT======");
            // console.log('INITIAL X', this.initialValues.getInitial_X())
            // console.log('INITAIL Y',  this.initialValues.getInitial_Y())
            // console.log('VVVVVERT', this.calcPosition.getCompVert());
            // // console.log('varDepth', this._calcDepthLimit2())

            // console.log("CHOSEN IN GET MAPPOINT OBJECT", currentObject.name);
            // console.log('point[1]', currentObject.point[1], 'coeff[1]', currentObject.coeff[1])
            // console.log('point[0]', currentObject.point[0], 'coeff[0]', currentObject.coeff[0])
            // console.log("====++++======");
            return currentObject;
        } catch (error) {
            console.error("getMapPointObject did not work for lat = ", lat);
        }
    }
    _calcDepthLimit2() {
        // console.log("====RESULT======");
        // console.log("compVeert", this.calcPosition.getCompVert())
        // console.log("NAAAAMMMMMMEEEEE", this.getMapPointObject().name);
        // console.log("====++++======");

        const index = this.getMapPointObject().id;
        const lastMapPointObject: IMapPointObject =
            MAP_POINT_OBJECTS[index - 1];
        const nextMapPointObject: IMapPointObject = MAP_POINT_OBJECTS[index];

        let startX =
            lastMapPointObject.coeff[0] * this.initialValues.getWidth();
        let endX = nextMapPointObject.coeff[0] * this.initialValues.getWidth();
        // console.log("getIitial_x", this.initialValues.getInitial_X());
        // console.log("COMPLAT", this.calcPosition.getCompLat());
        // console.log("nextMapPointObject.coeff[0]", nextMapPointObject.coeff[0]);
        // console.log("nextMapPointObject.coeff[1]", nextMapPointObject.coeff[1]);
        // console.log("START X ", startX);
        // console.log("END X", endX);
        let startY =
            lastMapPointObject.coeff[1] * this.initialValues.getHeight();
        let endY = nextMapPointObject.coeff[1] * this.initialValues.getHeight();

        // console.log('END Y', endY)
        // console.log('START Y ', startY)
        let x = this.getCompLat();
        // console.log('LATTTT IN CALCDEPTH ', x)

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
    calcPoint(coeff: number[]) {
        let result = [];
        result[0] = Math.floor(coeff[0] * this.initialValues.getWidth());
        result[1] = Math.floor(coeff[1] * this.initialValues.getHeight());
        return result;
    }
}

export default CalcPosition;
