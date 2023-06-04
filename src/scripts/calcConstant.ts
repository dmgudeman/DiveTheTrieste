import { WIDTH, HEIGHT } from "../index";
import {
    EUPHOTIC_PELAGIC,
    EUPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS,
    LAT_LIMITS_EXT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    MAP_POINT_OBJECTS,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";

import { IMapPointObject } from "./types";

class CalcConstant {
    private ocean: Ocean;
    private sub: Sub;
    private width: number;
    private height: number;

    constructor(width?: number, height?: number) {
        this.ocean = Ocean.getInstance();
        this.sub = Sub.getInstance();
        this.width = width || WIDTH;
        this.height = height || HEIGHT;
    }

    getOceanLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.45);
    }
    getFullLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.7);
    }
    getOceanVertLimit() {
        return this.roundDownToNearestVertVel(this.height * -0.55);
    }

    _getCompLat() {
        return this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS;
    }
    _getCompVert() {
        return this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION;
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

    getFullVertLimit() {
        return this.roundDownToNearestVertVel(this.height * -0.95);
    }

    getMapPointObject(lat: number): IMapPointObject {
        let result: IMapPointObject;
        try {
            for (let i = 1; i < MAP_POINT_OBJECTS.length - 1; i++) {
                if (
                    MAP_POINT_OBJECTS[i - 1].point[0] >= lat &&
                    MAP_POINT_OBJECTS[i].point[0] < lat
                ) {
                    result = MAP_POINT_OBJECTS[i];
                }
            }

            return result;
        } catch (error) {
            console.error("calcDepth did not work for lat = ", lat);
        }
    }

    getDistCAtoTrench() {
        return LAT_LIMITS_EXT[10].x;
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
        const index = this.getMapPointObject(lat).id;
        const mapPointObject: IMapPointObject = MAP_POINT_OBJECTS[index];
        if (!mapPointObject) return null;
        const nextMapPointObject: IMapPointObject =
            MAP_POINT_OBJECTS[index + 1];

        let endX = nextMapPointObject.coeff[0] * WIDTH;
        let startX = mapPointObject.coeff[0] * WIDTH;
        console.log("END X", endX);
        console.log("START X ", startX);
        let endY = nextMapPointObject.coeff[1] * HEIGHT;

        let startY = mapPointObject.coeff[1] * HEIGHT;
        console.log("END Y", endY);
        console.log("START Y ", startY);
        let x = lat;
        // if (depthObject.id === 0) return 21;
        if (startX === endX) {
            // handles vertical line
            endX = endX + 1;
        }
        const slope = (endY - startY) / (endX - startX);
        const yIntercept = startY - slope * startX;
        const y = slope * x + yIntercept;
        // let ans = Math.floor(y / VERTICAL_VELOCITY) * VERTICAL_VELOCITY; // round down to the nearest velocity
        return y;
    }
    getPreviousMapPointObject(num: number): IMapPointObject {
        let result = MAP_POINT_OBJECTS.filter(
            (mapPoint) => mapPoint.id === num - 1
        );
        return result[0];
    }

    roundDownToNearestVertVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }

    roundDownToNearestLatVel(num: number) {
        return Math.floor(num / LAT_VELOCITY) * LAT_VELOCITY;
    }
}

export default CalcConstant;
