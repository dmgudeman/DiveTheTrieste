import { MAP_POINT_OBJECTS, VERTICAL_VELOCITY } from "./constants";
import { IMapPointObject } from "./types";

class CalcConstant {
    constructor() {}

    getDistCAtoTrench() {
        return MAP_POINT_OBJECTS[10].point[0];
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
}

export default CalcConstant;
