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
    textObjects,
    LAT_VELOCITY
    
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { ITextObject, IMapPointObject } from "./types";
import InitialValues from "./initialValues";


class CalcConstant {
    private initialValues: InitialValues;
    private textObjects: ITextObject[];
    private OorS: string[]

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.textObjects = textObjects;  
    }

   

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
