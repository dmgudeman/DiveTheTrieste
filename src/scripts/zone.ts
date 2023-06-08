import {
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    VERTICAL_VELOCITY,
    textObjects,
} from "./constants";
import CalcConstant from "./calcConstant";
import {ITextObject} from './types';
import InitialValues from "./initialValues";
import CalcPosition from "./calcPosition";

class Zone {
    private initialValues: InitialValues;
    private calcPosition: CalcPosition;
    private calcConstants: CalcConstant;
    private flag: number;
    private oldFlag: number;


    constructor() {
        this.calcConstants = new CalcConstant();
        this.initialValues = InitialValues.getInstance();
        this.calcPosition = CalcPosition.getInstance();
        this.flag = null;
        this.oldFlag = null;
    }
    upDateZoneObject():ITextObject{ 
        this._getZone();
      
        if (this.oldFlag !== this.flag) {
            this.oldFlag = this.flag;
            if (this.flag === EUPHOTIC_PELAGIC) {           
                return textObjects[0]
            } else if (this.flag === EUPHOTIC_BENTHIC) {
                return textObjects[1]
            } else if (this.flag === DYSPHOTIC_PELAGIC) {               
                return textObjects[2]
            } else if (this.flag === DYSPHOTIC_BENTHIC) {          
                return textObjects[3]
            } else if (this.flag === APHOTIC_PELAGIC) {
                return textObjects[4]
            } else if (this.flag === APHOTIC_BENTHIC) {
                return textObjects[5]
            } else {
                return textObjects[this.flag]
            }
        } 
        return textObjects[this.flag]
    }

    _getZone(): void {
        let vert = this.calcPosition.getCompVert();
        let depth = this.calcPosition._calcDepthLimit2();
      
        if (vert > this.initialValues.getHeight() * -0.211) {
            if (vert - depth > 4 * VERTICAL_VELOCITY) {
                this.flag =  EUPHOTIC_PELAGIC;
            } else {
                this.flag = EUPHOTIC_BENTHIC;
            }
        } else if (vert > this.initialValues.getHeight() * -0.45) {
            if (vert - depth > 4 * VERTICAL_VELOCITY) {
                this.flag = DYSPHOTIC_PELAGIC;
            } else {
                this.flag = DYSPHOTIC_BENTHIC;
            }
        } else {
            if (vert - depth > 1 * VERTICAL_VELOCITY) {
                this.flag = APHOTIC_PELAGIC;
            } else {
                this.flag = APHOTIC_BENTHIC;
            }
        }
    }
    getZoneObjectNumber():number {
       return  this.upDateZoneObject().id
    }
}
export default Zone;
