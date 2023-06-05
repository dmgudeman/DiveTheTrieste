import {
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    textObjects,
} from "./constants";
import CalcConstant from "./calcConstant";
import Ocean from "./ocean";
import Sub from "./sub";
import {ITextObject} from './types';
import { eventBus } from "./eventBus";

class Zone {

    private vert: number;
    private varDepth: number;
    private calcConstants: CalcConstant;
    private flag: number;
    private oldFlag: number;


    constructor() {
        this.calcConstants = new CalcConstant();
        this.varDepth = this.calcConstants._calcDepthLimit2() || null;
        this.flag = null;
        this.oldFlag = null;
    }
    upDateZoneObject():ITextObject{ 
        this.varDepth = this.calcConstants._calcDepthLimit2()
        this.flag = this.calcConstants._getZone(this.vert, this.varDepth);
      
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
}
export default Zone;
