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

// this is to allow calculation of a modelo so that
// the bubble messages released at a slow pace
let i = 0;
let flag;
let oldFlag;
// this is being called from the main animation loop in index.js
export function calcMovement(ocean: Ocean, sub: Sub) {
    let compVert = ocean.getY() + sub.getY() - INITIAL_Y_POSITION;
    let compLat = ocean.getX() + sub.getX() - SUB_INITIAL_LAT_POS;
    i++;

    // console.log("comLat", compLat);
    // console.log("compVert", compVert);

    // console.log("oldFlag", oldFlag);
    // console.log("flag", flag);
    if (i % 1 === 0 && !stopMessageAnimation.messFlag) {
        if (compLat < B_P_BARRIER) {
            if (compVert < CONT_SHELF_BENTHIC) {
                flag = EUPHOTIC_BENTHIC;
            } else {
                flag = DYSPHOTIC_BENTHIC;
            }
        } else if (compLat < LEFT_EDGE_TRENCH) {
            if (compVert < E_D_BARRIER) {
                flag = EUPHOTIC_PELAGIC;
            } else if (compVert < CONT_SHELF_BENTHIC) {
                flag = DYSPHOTIC_PELAGIC;
            } else {
                flag = DYSPHOTIC_BENTHIC;
            }
        } else if (compLat < RIGHT_EDGE_TRENCH) {
            if (compVert < E_D_BARRIER) {
                flag = EUPHOTIC_PELAGIC;
            } else if (compVert < D_A_BARRIER) {
                flag = DYSPHOTIC_PELAGIC;
            } else if (compVert < APHOTIC_BENTHIC_BARRIER) {
                flag = APHOTIC_PELAGIC;
            } else {
                flag = APHOTIC_BENTHIC;
            }
        } else {
            if (compVert < CONT_SHELF_BENTHIC) {
                flag = EUPHOTIC_BENTHIC;
            } else {
                flag = DYSPHOTIC_BENTHIC;
            }
        }

        if (oldFlag !== flag) {
            oldFlag = flag;

            if (flag === EUPHOTIC_PELAGIC) {
                changeEducationalText(EPTextObject);
                addEdTextStyle("upperPelagic");

                return;
            } else if (flag === EUPHOTIC_BENTHIC) {
                changeEducationalText(EBTextObject);
                addEdTextStyle("upper");

                return;
            } else if (flag === DYSPHOTIC_PELAGIC) {
                // message = iteraterMessage(dpMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(DPTextObject);
                addEdTextStyle("middle");
                return;
            } else if (flag === DYSPHOTIC_BENTHIC) {
                // message = iteraterMessage(dbMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(DBTextObject);
                addEdTextStyle("middle");
                return;
            } else if (flag === APHOTIC_PELAGIC) {
                // message = iteraterMessage(apMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(APTextObject);
                addEdTextStyle("lower");
                return;
            } else if (flag === APHOTIC_BENTHIC) {
                // message = iteraterMessage(abMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(ABTextObject);
                addEdTextStyle("lower");
                return;
            }
        }
    }
}


class ProvideMessage {
    private messages: ITextObject[];
    private vert: number;
    private depth: number;
    private calcConstants: CalcConstant;
    private zoneFlag: string;

    constructor(vert: number, depth: number) {
        this.messages = textObjects;
        this.vert = vert;
        this.depth = depth;
        this.calcConstants = new CalcConstant();
        this.zoneFlag = this.calcConstants.getZone(this.vert, this.depth);
    }

    upDateZoneFlag(vertical: number, varDepth: number) {
        this.zoneFlag =  this.calcConstants.getZone(vertical, varDepth);
    }
}
export default ProvideMessage;
