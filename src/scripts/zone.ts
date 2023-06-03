import {
    
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    textObjects,
} from "./constants";
import EdText from "./edText";
import CalcConstant from "./calcConstant";
import Ocean from "./ocean";
import Sub from "./sub";

class Zone {
    private ocean: Ocean;
    private sub: Sub;
    private lat: number;
    private vert: number;
    private varDepth: number;
    private calcConstants: CalcConstant;
    private flag: number;
    private oldFlag: number;
    private edText: EdText

    constructor() {
        this.ocean = Ocean.getInstance();
        this.sub = Sub.getInstance();
        this.calcConstants = new CalcConstant();
        this.lat = this.calcConstants._getCompLat(this.ocean, this.sub) || 0;
        this.vert = this.calcConstants._getCompVert(this.ocean, this.sub) || 0;
        this.varDepth = this.calcConstants._calcDepthLimit(this.lat) || null;
        this.flag = this.calcConstants._getZone(this.lat, this.vert) || null;
        this.oldFlag = null;
        this.edText = new EdText();
    }

    upDateZoneObject() { 
        this.varDepth = this.calcConstants._calcDepthLimit(this.lat)
        this.flag = this.calcConstants._getZone(this.vert, this.varDepth);
       
        if (this.oldFlag !== this.flag) {
            this.oldFlag = this.flag;

            if (this.flag === EUPHOTIC_PELAGIC) {
                this.edText.updateEdText(0)
                return textObjects[0]
            } else if (this.flag === EUPHOTIC_BENTHIC) {
                this.edText.updateEdText(1)
                return textObjects[1]
            } else if (this.flag === DYSPHOTIC_PELAGIC) {
                this.edText.updateEdText(2)
                return textObjects[2]
            } else if (this.flag === DYSPHOTIC_BENTHIC) {
                this.edText.updateEdText(3)
                return textObjects[3]
            } else if (this.flag === APHOTIC_PELAGIC) {
                this.edText.updateEdText(4)
                return textObjects[4]
            } else if (this.flag === APHOTIC_BENTHIC) {
                this.edText.updateEdText(5)
                return textObjects[5]
            }
        }
    }
}
export default Zone;
