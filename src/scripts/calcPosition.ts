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
    private OorS: string[];

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
        this.OorS = ["O", "O"];
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
 
    };

    handleSubXChange = (newX: number) => {
        this.subLat = newX;
        this.compLat =
            this.oceanLatLimit -
            this.subLat +
            this.initialValues.getInitial_X();
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

    getOceanLat() {
        return this.oceanLat;
    }

    getSubLat() {
        return this.subLat;
    }

    getOceanVert() {
        return this.oceanVert;
    }

    getSubVert() {
        return this.subVert;
    }

    getOorS(dir: string): string[] {
        let lat = this.getCompLat();
        let vert = this.getCompVert();
        let latLimit = this.initialValues.getOceanLatLimit();
        let vertLimit = this.initialValues.getOceanVertLimit();
        let modVertLimit = vertLimit + VERTICAL_VELOCITY;
        // console.log("== GET OORS ==", vert);
        // console.log("MODLIMIT", modVertLimit);
        // console.log("LIMIT", vertLimit);
        // console.log("VERT >= MODLIMIT", vert >= modVertLimit);
        // console.log("VERT <= MODLIMIT", vert < modVertLimit);
        // console.log("OCEAN VERT", this.getOceanVert());
        // console.log("SUB VERT", this.getSubVert());
        // console.log("=========");
        if (dir === "right" || dir === "left") {
            if (lat >= latLimit) {
                console.log("this.OorS", this.OorS);
                this.OorS[0] = "O";
                return this.OorS;
            } else if (lat < latLimit) {
                this.OorS[0] = "S";
                console.log("this.OorS", this.OorS);
                return this.OorS;
            }
        } else if (dir === "up" || dir === "down")
            if (vert >= vertLimit) {
                this.OorS[1] = "O";
                console.log("this.OorS", this.OorS);
                return this.OorS;
            } else if (vert < vertLimit) {
                this.OorS[1] = "S";
                console.log("this.OorS", this.OorS);
                return this.OorS;
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
