import {
    INITIAL_Y_POSITION,
    E_D_BARRIER,
    D_A_BARRIER,
    CONT_SHELF_BENTHIC,
    OCEAN_BOTTOM,
    APHOTIC_BENTHIC_BARRIER,
    B_P_BARRIER,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    SUB_INITIAL_LAT_POS,
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    stopMessageAnimation,
    textObjects,
} from "./constants";
import { WIDTH, HEIGHT } from "../index";
// import {
//     addAndStartMessAnimation,
//     stopAnimation,
//     removeMessageElement,
// } from "./edMessage1";
import { changeEducationalText, addEdTextStyle } from "./educational";

import Ocean from "./ocean";
import Sub from "./sub";
import { ITextObject } from "./types";
import CalcConstant from "./calcConstant";

class ProvideMessage {
    private messages: ITextObject[];
    private vert: number;
    private depth: number;
    private calcConstants: CalcConstant;
    private flag: string;
    private oldFlag: string;

    constructor(vert: number, depth: number) {
        this.messages = textObjects;
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
export default ProvideMessage;
