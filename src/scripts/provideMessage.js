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

export function calcMovement(ocean, sub) {
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;


    if (compLat < B_P_BARRIER && compVert < CONT_SHELF_BENTHIC) {
        return  getMessage(EUPHOTIC_BENTHIC);
    } else if (compLat < LEFT_EDGE_TRENCH && compVert <= CONT_SHELF_BENTHIC) {
        return getMessage(EUPHOTIC_PELAGIC);
    } else if (compLat < LEFT_EDGE_TRENCH && compVert > CONT_SHELF_BENTHIC) {
        return getMessage(DYSPHOTIC_BENTHIC);
    }
}

export const getMessage = (flag) => {
    switch (flag) {
        case EUPHOTIC_BENTHIC:
           return ebMessages[ Math.floor(Math.random() * ebMessages.length)];
        case EUPHOTIC_PELAGIC: 
            return epMessages[Math.floor(Math.random() * epMessages.length)];
        case DYSPHOTIC_BENTHIC:
            return dbMessages[Math.floor(Math.random() * dbMessages.length)];

        default:
            return null;
    }
};

export const getTimedMessage = (ocean, sub) => {
     console.log("THIS IS CALLED")
       let message =  calcMovement(ocean, sub)
        addAndStartAnimation(message)
        return message;
}

const ebMessages = [
    "You are in the Euphotic Benthic zone",
    "Euphotic means Lots of sunlight",
    "Benthic means bottom dwelling",
    "It has some of the most concentrated life in the ocean",
];

const epMessages = [
    "You are in the Euphotic Pelagic zone",
    "Euphotic means Lots of sunlight",
    "Pelagic means free swimming",
    "This is where tuna, sharks and whales live",
];
const dbMessages = [
    "You are in the Dysphotic Benthic zone",
    "Dysphotic means only a little sunlight",
    "Benthic means bottom dwelling",
    "It is becoming very dark",
];
