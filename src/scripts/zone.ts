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

class Zone {
    private vert: number;
    private depth: number;
    private calcConstants: CalcConstant;
    private flag: string;
    private oldFlag: string;
    private edText: EdText

    constructor(vert: number, depth: number) {
        this.vert = vert;
        this.depth = depth;
        this.calcConstants = new CalcConstant();
        this.flag = this.calcConstants.getZone(this.vert, this.depth);
        this.oldFlag = "";
        this.edText = new EdText();
    }

    upDateZoneFlag(vertical: number, varDepth: number) {
        this.flag = this.calcConstants.getZone(vertical, varDepth);
        console.log("THIS FLAG", this.flag);

        if (this.oldFlag !== this.flag) {
            this.oldFlag = this.flag;

            if (this.flag === EUPHOTIC_PELAGIC) {
                this.edText.updateEdText(0)
            } else if (this.flag === EUPHOTIC_BENTHIC) {
                this.edText.updateEdText(1)
            } else if (this.flag === DYSPHOTIC_PELAGIC) {
                this.edText.updateEdText(2)
            } else if (this.flag === DYSPHOTIC_BENTHIC) {
                this.edText.updateEdText(3)
            } else if (this.flag === APHOTIC_PELAGIC) {
                this.edText.updateEdText(4)
            } else if (this.flag === APHOTIC_BENTHIC) {
                this.edText.updateEdText(5)
            }
        }
    }
}
export default Zone;
