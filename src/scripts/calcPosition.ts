import { eventBus } from "./eventBus";
import { VERTICAL_VELOCITY, MAP_POINT_OBJECTS } from "./constants";
import InitialValues from "./initialValues";
import { IMapPointObject } from "./types";

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
    };

    handleSubYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.subVert = newY;
        this.compVert =
            this.oceanVert - this.subVert + this.initialValues.getInitial_Y();
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
        if (dir === "right" || dir === "left") {
            if (lat >= latLimit) {
                this.OorS[0] = "O";
                return this.OorS;
            } else if (lat < latLimit) {
                this.OorS[0] = "S";
                return this.OorS;
            }
        } else if (dir === "up" || dir === "down")
            if (vert >= vertLimit) {
                this.OorS[1] = "O";
                return this.OorS;
            } else if (vert < vertLimit) {
                this.OorS[1] = "S";
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
                }
            }
            return currentObject;
        } catch (error) {
            console.error("getMapPointObject did not work for lat = ", lat);
        }
    }
    _calcDepthLimit2() {
        const index = this.getMapPointObject().id;
        const lastMapPointObject: IMapPointObject =
            MAP_POINT_OBJECTS[index - 1];
        const nextMapPointObject: IMapPointObject = MAP_POINT_OBJECTS[index];
        let startX =
            lastMapPointObject.coeff[0] * this.initialValues.getWidth();
        let endX = nextMapPointObject.coeff[0] * this.initialValues.getWidth();
        let startY =
            lastMapPointObject.coeff[1] * this.initialValues.getHeight();
        let endY = nextMapPointObject.coeff[1] * this.initialValues.getHeight();
        let x = this.getCompLat();
        if (startX === endX) {
            // handles vertical line
            endX = endX + 1;
        }
        // variable depth for a given x is the y intercept of the points held 
        // in the MAP_POINT_OBJECTS. The MAP_POINTS were taken on an example
        // screen and mapped out manually getting the x and y of the surface
        // features of the map.  A x and y coeff was determined by x/width and
        // y/height.  The width and height being determined in index.ts and
        // approximately 2 times viewport w and h.  These coeffs then can be
        // utilized to estimate the points when the w and h changes during
        // resizing. 
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
