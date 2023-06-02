import {
    
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    textObjects,
} from "./constants";
import { changeEducationalText, addEdTextStyle } from "./educational";
import CalcConstant from "./calcConstant";

class Zone {
    private vert: number;
    private depth: number;
    private calcConstants: CalcConstant;
    private flag: string;
    private oldFlag: string;

    constructor(vert: number, depth: number) {
        this.vert = vert;
        this.depth = depth;
        this.calcConstants = new CalcConstant();
        this.flag = this.calcConstants.getZone(this.vert, this.depth);
        this.oldFlag = "";
    }

    upDateZoneFlag(vertical: number, varDepth: number) {
        this.flag = this.calcConstants.getZone(vertical, varDepth);
        console.log("THIS FLAG", this.flag);

        if (this.oldFlag !== this.flag) {
            this.oldFlag = this.flag;

            if (this.flag === EUPHOTIC_PELAGIC) {
                changeEducationalText(textObjects[0]);
                addEdTextStyle("upperPelagic");
            } else if (this.flag === EUPHOTIC_BENTHIC) {
                changeEducationalText(textObjects[1]);
                addEdTextStyle("upper");
            } else if (this.flag === DYSPHOTIC_PELAGIC) {
                changeEducationalText(textObjects[2]);
                addEdTextStyle("middle");
            } else if (this.flag === DYSPHOTIC_BENTHIC) {
                changeEducationalText(textObjects[3]);
                addEdTextStyle("middle");
            } else if (this.flag === APHOTIC_PELAGIC) {
                changeEducationalText(textObjects[4]);
                addEdTextStyle("lower");
            } else if (this.flag === APHOTIC_BENTHIC) {
                changeEducationalText(textObjects[5]);
                addEdTextStyle("lower");
            }
        }
    }
}
export default Zone;
