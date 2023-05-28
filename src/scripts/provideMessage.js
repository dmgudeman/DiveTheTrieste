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
} from "./constants";
import { WIDTH, HEIGHT } from "../index";
import {
    addAndStartMessAnimation,
    stopAnimation,
    removeMessageElement,
} from "./edMessage";
import { globalOcean, globalSub  } from "../index";

// this is to allow calculation of a modelo so that
// the bubble messages released at a slow pace
let i = 0;
let flag;
let oldFlag;
// this is being called from the main animation loop in index.js
export function calcMovement() {
    let ocean = globalOcean.ocean;
    let sub = globalSub.sub;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    i++;

    // console.log("comLat", compLat);
    // console.log("compVert", compVert);

    // console.log("oldFlag", oldFlag);
    // console.log("flag", flag);
    if (i % 40 === 0 && !stopMessageAnimation.messFlag) {
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

            let message;
            if (flag === EUPHOTIC_PELAGIC) {
                message = iteraterMessage(epMessages);
                addAndStartMessAnimation(message);
                return;
            } else if (flag === EUPHOTIC_BENTHIC) {
                message = iteraterMessage(ebMessages);
                addAndStartMessAnimation(message);
                return;
            } else if (flag === DYSPHOTIC_PELAGIC) {
                message = iteraterMessage(dpMessages);
                addAndStartMessAnimation(message);
                return;
            } else if (flag === DYSPHOTIC_BENTHIC) {
                message = iteraterMessage(dbMessages);
                addAndStartMessAnimation(message);
                return;
            } else if (flag === APHOTIC_PELAGIC) {
                message = iteraterMessage(apMessages);
                addAndStartMessAnimation(message);
                return;
            } else if (flag === APHOTIC_BENTHIC) {
                message = iteraterMessage(abMessages);
                addAndStartMessAnimation(message);
                return;
            }
        }
    }
}

export const getMessage = (ocean, sub) => {
    let flag = calcMovement(ocean, sub);
};

export const getTimedMessage = (ocean, sub) => {
    // let message = calcMovement(ocean, sub);
    console.log("MESSAGE in getTimed", message);
    addAndStartMessAnimation(message);
    return message;
};

const epMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "EUPHOTIC PELAGIC ZONE",
        2: "Euphotic means Lots of sunlight",
        3: "Pelagic means free swimming",
        4: "This is where tuna, sharks and whales live",
    },
};

const ebMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "EUPHOTIC BENTHIC ZONE",
        2: "Euphotic means Lots of sunlight",
        3: "Benthic means bottom dwelling",
        4: "It has some of the most concentrated life in the ocean",
    },
};

const dpMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "DYSPHOTIC PELAGIC ZONE",
        2: "Dysphotic means only a little sunlight",
        3: "Pelagic means free swimming",
        4: "It is becoming very dark",
    },
};

const dbMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "DYSPHOTIC BENTHIC ZONE",
        2: "Dysphotic means only a little sunlight",
        3: "Benthic means bottom dwelling",
        4: "It is becoming very dark",
    },
};

const apMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "APHOTIC PELAGIC ZONE",
        2: "Dysphotic means no light",
        3: "Benthic means bottom dwelling",
        4: "There is NO light",
    },
};

const abMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "DYSPHOTIC BENTHIC ZONE",
        2: "There is no light",
        3: "Benthic means bottom dwelling",
        4: "Hot water vents supply energy",
    },
};

const iteraterMessage = (messObj) => {
    let messNum = messObj.lastUsed + 1;
    // start the rotation over again if the end
    // of the messages is used
    if (messNum > messObj.length) {
        stopMessageAnimation.messFlag = true;
    }
    messObj.lastUsed = messNum;
    return messObj.messages[messNum];
    
};
