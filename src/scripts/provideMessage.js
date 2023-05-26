import {
    INITIAL_Y_POSITION,
    E_D_BARRIER,
    D_A_BARRIER,
    CONT_SHELF_BENTHIC,
    OCEAN_BOTTOM,
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
} from "./constants";
import { WIDTH, HEIGHT } from "../index";
import { addAndStartAnimation } from "./edMessage";


// this is to allow calculation of a modelo so that
// the bubble messages released at a slow pace
let i = 0;

// this is being called from the main animation loop in index.js
export function calcMovement(ocean, sub) {
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    i++;
    // console.log(i);
    // console.log("comLat", compLat);
    // console.log("compVert", compVert);
    if (i % 40 === 0) {
        if (compLat < B_P_BARRIER && compVert < CONT_SHELF_BENTHIC) {
            EUPHOTIC_BENTHIC;
        } else if (
            compLat < LEFT_EDGE_TRENCH &&
            compVert <= CONT_SHELF_BENTHIC
        ) {
            EUPHOTIC_PELAGIC
        } else if (
            compLat < LEFT_EDGE_TRENCH &&
            compVert > CONT_SHELF_BENTHIC
        ) {
           DYSPHOTIC_BENTHIC;
        }
    }
}

export const getMessage = (flag) => {
    console.log("FFFFFFLLLLAAAAGGG", flag);
    let message;
    switch (flag) {
        case EUPHOTIC_BENTHIC:
           message = iteraterMessage(ebMessages);
           addAndStartAnimation(message);
           return
        case EUPHOTIC_PELAGIC:
            message = iteraterMessage(epMessages);
            addAndStartAnimation(message);
            return
        case DYSPHOTIC_BENTHIC:
            return iteraterMessage(dbMessages);
        default:
            return null;
    }
};

export const getTimedMessage = (ocean, sub) => {
    // let message = calcMovement(ocean, sub);
    console.log("MESSAGE in getTimed", message);
    addAndStartAnimation(message);
    return message;
};

const ebMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "You are in the Euphotic Benthic zone",
        2: "Euphotic means Lots of sunlight",
        3: "Benthic means bottom dwelling",
        4: "It has some of the most concentrated life in the ocean",
    },
};

const epMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "You are in the Euphotic Pelagic zone",
        2: "Euphotic means Lots of sunlight",
        3: "Pelagic means free swimming",
        4: "This is where tuna, sharks and whales live",
    },
};

const dbMessages = {
    length: 4,
    lastUsed: 0,
    messages: {
        1: "You are in the Dysphotic Benthic zone",
        2: "Dysphotic means only a little sunlight",
        3: "Benthic means bottom dwelling",
        4: "It is becoming very dark",
    },
};

const iteraterMessage = (messObj) => {
    let messNum = messObj.lastUsed + 1;
    // start the rotation over again if the end
    // of the messages is used
    if (messNum > messObj.length) {
        messNum = 1;
    }

    messObj.lastUsed = messNum;
    let x = messObj.messages[messNum];
    return x;
};
