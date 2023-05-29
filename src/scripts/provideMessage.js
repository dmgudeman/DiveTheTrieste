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
// import {
//     addAndStartMessAnimation,
//     stopAnimation,
//     removeMessageElement,
// } from "./edMessage1";
import { changeEducationalText, addEdTextStyle} from './educational';
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
    if (i % 1=== 0 && !stopMessageAnimation.messFlag) {
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
                // message = iteraterMessage(epMessages);
                // addAndStartMessAnimation(message);

                changeEducationalText(EPTextObject)
                addEdTextStyle('upper');

                return;
            } else if (flag === EUPHOTIC_BENTHIC) {
                // message = iteraterMessage(ebMessages);
                // addAndStartMessAnimation(message);
             
                changeEducationalText(EBTextObject)
                // addEdTextStyle('upperPelagic');
                addEdTextStyle('upper');

                return;
            } else if (flag === DYSPHOTIC_PELAGIC) {
                // message = iteraterMessage(dpMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(DPTextObject)
                addEdTextStyle('middle');
                return;
            } else if (flag === DYSPHOTIC_BENTHIC) {
                // message = iteraterMessage(dbMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(DBTextObject);
                addEdTextStyle('middle');
                return;
            } else if (flag === APHOTIC_PELAGIC) {
                // message = iteraterMessage(apMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText(APTextObject)
                addEdTextStyle('lower');
                return;
            } else if (flag === APHOTIC_BENTHIC) {
                // message = iteraterMessage(abMessages);
                // addAndStartMessAnimation(message);
                changeEducationalText("APHOTIC BENTHIC");
                addEdTextStyle('lower');
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


const EBTextObject = {title: "EUPHOTIC BENTHIC", text: "The euphotic benthic zone is a crucial region in the ocean where sunlight reaches, allowing for photosynthesis. It extends from the ocean surface to around 200 meters deep, supporting diverse flora and fauna. Marine algae, seagrasses, and phytoplankton thrive in this zone, providing oxygen and serving as the foundation of the food web. Zooplankton, corals, and other invertebrates inhabit the benthic habitats, offering food and shelter to various species. Geographically, the euphotic benthic zone is prevalent in coastal areas, influencing adjacent ecosystems like coral reefs and seagrass meadows. It plays a vital role in carbon cycling, nutrient dynamics, and maintaining marine biodiversity. Preserving this zone is crucial for sustaining ocean health and the intricate balance of marine ecosystems."}
const EPTextObject = {title: "EUPHOTIC PELAGIC", text: "The uppermost layer of the open ocean sunlight can penetrate allowing photosynthesis to occur. Flora consists of phytoplankton, microscopic plant-like organisms that harness sunlight. These microscopic plants serve as the foundation of the marine food web, providing nourishment for a wide range of organisms. They contribute significantly to global oxygen production and carbon dioxide absorption, playing a vital role in regulating the Earth's climate. Fauna includes zooplankton, small fish, squid, and jellyfish. Many species undertake vertical migrations, moving closer to the surface during the night to feed on phytoplankton and descending to deeper depths during the day to avoid predators. Larger marine animals, such as whales and dolphins, often rely on the abundant food resources found in the euphotic pelagic zone.Commercial fisheries, providing a substantial portion of the world's seafood supply. It claims a major role in carbon sequestration balancing global ecosystem. "}

const DBTextObject = {title: "DYSPHOTIC BENTHIC", text: "Here sunlight barely penetrates and darkness prevails. The flora is algae, fungi, and bacteria that have adapted to obtain energy through CHEMOSYNTHESIS or by consuming organic matter settling from above.The fauna includes deep-sea fish, sea cucumbers, sea stars, sea anemones, corals, sponges, and crustaceans. Here is a refuge for numerous species that seek shelter from predators in shallower zones. It is important for nutrient recycling and maintaining the balance of carbon. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs), are employed to investigate this zone."}

const DPTextObject = {title: "DYPHOTIC PELAGIC", text: "Here the flora is primarily phytoplankton and zooplankton and some diatoms. The fauna is. Fish include the lanternfish, hatchetfish, and dragonfishs. These fish have evolved large eyes and bioluminescent organs, to navigate and communicate in the dimly lit environment. Cephalopods, shrimp, and jellyfish, are also found in this zone, all adapted to low light. It serves as a crucial feeding ground for migratory species, including whales and large predatory fish, as they follow the vertical migration of zooplankton from the depths to the surface. Dead matter drifts down from the euphotic zone sustains sustaining a complex food web. Understanding the dysphotic pelagic zone is essential for comprehending the dynamics of the global carbon cycle. The zone plays a crucial role in the sequestration of carbon dioxide through the biological pump, where carbon is transported from the surface to the deep ocean through sinking particles. This process helps regulate atmospheric carbon levels and mitigates climate change."}

const APTextObject = {title: "APHOTIC PELAGIC", text: "In the absence of sunlight, this zone has low temperatures, high pressure, and limited nutrient availability. Despite these challenges, the zone is not devoid of life. Unique and highly adapted organisms inhabit this realm, relying on alternative energy sources and survival strategies. In this zone, the primary producers are CHEMOSYNTHETIC bacteria that derive energy from inorganic compounds, such as hydrogen sulfide or methane. These bacteria serve as the foundation of the food chain, supporting a variety of organisms that are adapted to survive in extreme conditions. Deep-sea fish, cephalopods, and other invertebrates, some with bioluminescent abilities, are found here.The aphotic pelagic zone plays a significant role in the cycling of organic matteand the global carbon cycle. Organic particles, called marine snow, sink from the surface waters providing sustenance. The marine snow transports carbon from the surface to the deep ocean, sequestering it for long periods and influencing the planet's carbon balance."}


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
