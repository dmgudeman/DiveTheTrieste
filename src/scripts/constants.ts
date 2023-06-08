// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit


import { ITextObject, IMapPointObject, IMP} from './types';
import CalcConstant from './calcConstant';
import InitialValues from './initialValues';

export const stopMessageAnimation = {
    messFlag: true
  };
  
  let _CURRENT_CANVAS = 2;
  export const getCurrentCanvas = () => _CURRENT_CANVAS; 
  export const setCurrentCanvas = (value:number) => {
    if (value === 1 || value === 2 || value === 3) {
      _CURRENT_CANVAS = value;
    } else {
      console.error('Invalid canvas value. Please provide a value of 1, 2, or 3.');
    }
  };

  let _HIT_BOTTOM_FLAG:Boolean = false;
  export const getHitBottomFlag = ():Boolean => _HIT_BOTTOM_FLAG;
  export const setHitBottomFlag = (value:Boolean):void => {
      _HIT_BOTTOM_FLAG = value;
  }


// values
export const SEA_DEPTH = 36161; // feet
export const DIST_CA_TO_TRENCH = 6000; //miles

// velocities
export const LAT_VELOCITY = 20;
export const VERTICAL_VELOCITY = 20;


// for messaging and photos
export const EUPHOTIC_PELAGIC: number = 0;
export const EUPHOTIC_BENTHIC: number = 1;
export const DYSPHOTIC_PELAGIC: number = 2;
export const DYSPHOTIC_BENTHIC: number = 3;
export const APHOTIC_PELAGIC: number = 4;
export const APHOTIC_BENTHIC: number = 5;

const OOB_LEFT = 'OOB_LEFT';
const INITIAL_POSITION = 'INITIAL_POSITION';
const SLOPE_LIMIT = 'SLOPE_LIMIT';
const START_BUMP = 'START_BUMP';
const BUMP_PEAK = 'BUMP_PEAK';
const END_BUMP = 'END_BUMP';
const START_DBL = 'START_DBL';
const DBL_PEAK_1 = 'DBL_PEAK_1';
const DBL_PEAK_2 = 'DBL_PEAK_2';
const END_DBL = 'END_DBL';
const START_TRENCH = 'START_TRENCH';
const TRENCH_BOTTOM_L = 'TRENCH_BOTTOM_L';
const TRENCH_BOTTOM_R = 'TRENCH_BOTTOM_R';
const END_TRENCH = 'END_TRENCH'
const END_POSITION = 'END_POSITION';
const OOB_RIGHT = 'OOB_RIGHT';
const OOB_RIGHT_2 = 'OOB_RIGHT_2';


// these update the constants in calConstant
const MP_0 :IMP = [ 0, -60, OOB_LEFT ];
const MP_1 :IMP = [ 0, -60, INITIAL_POSITION];      // lateral based on width 3840    
const MP_2 :IMP = [ -180, -461, SLOPE_LIMIT ];    // vertical based on height of 1986
const MP_3 :IMP = [ -460, -520, START_BUMP ];    
const MP_4 :IMP = [ -860, -420, BUMP_PEAK ];    
const MP_5 :IMP = [ -980, -520, END_BUMP ];    
const MP_6 :IMP = [ -1060, -520, START_DBL ];  
const MP_7 :IMP = [ -1180, -220, DBL_PEAK_1 ];
const MP_8 :IMP = [ -1320, -240, DBL_PEAK_2 ];
const MP_9 :IMP = [ -1400, -481, END_DBL ];
const MP_10 :IMP = [ -1580, -520, START_TRENCH ];
const MP_11 :IMP = [ -1650, -1760, TRENCH_BOTTOM_L ];
const MP_12 :IMP = [ -1840, -1760, TRENCH_BOTTOM_R];
const MP_13 :IMP = [ -2040, -520, END_TRENCH];
const MP_14 :IMP = [ -2488, -520, END_POSITION];
const MP_15 :IMP = [ -3840, -520, OOB_RIGHT];
const MP_16 :IMP = [ -3840, -520, OOB_RIGHT_2];

export const MAP_POINTS: IMP[] = [
  MP_0, MP_1, MP_2, MP_3,
  MP_4, MP_5, MP_6, MP_7,
  MP_8, MP_9, MP_10, MP_11,
  MP_12, MP_13, MP_14, MP_15, MP_16
]

// lateral based on width 3840    
// vertical based on height of 1986
// this array not being used
const MULT_MP_0 :number[] = [  0,  0 ];
const MULT_MP_1 :number[] = [  0,  0];
const MULT_MP_2 :number[] = [ -0.0468, -0.2164 ];// lateral based on width 3840    
const MULT_MP_3 :number[] = [ -0.1823, -0.2618 ];// vertical based on height of 1986
const MULT_MP_4 :number[] = [ -0.2239, -0.2115 ];
const MULT_MP_5 :number[] = [ -0.2552, -0.2618 ];
const MULT_MP_6 :number[] = [ -0.2781, -0.2618 ];
const MULT_MP_7 :number[] = [ -0.3021, -0.1108 ];
const MULT_MP_8 :number[] = [ -0.3437, -0.1208 ];
const MULT_MP_9 :number[] = [ -0.3646, -0.2422 ];
const MULT_MP_10 :number[] = [ -0.4115, -0.2618 ];
const MULT_MP_11 :number[] = [ -0.4297, -0.8862 ];
const MULT_MP_12 :number[] = [ -0.4791, -0.8862 ];
const MULT_MP_13 :number[] = [ -0.5312, -0.2618 ];
const MULT_MP_14 :number[] = [ -0.5729, -0.2618 ];
const MULT_MP_15 :number[] = [ -1, -0.2618 ];
const MULT_MP_16 :number[] = [ -1, -0.2618 ];

export const MAP_POINT_COEFFS: number[][] =[
  MULT_MP_0, MULT_MP_1, MULT_MP_2, MULT_MP_3,
  MULT_MP_4, MULT_MP_5, MULT_MP_6, MULT_MP_7,
  MULT_MP_8, MULT_MP_9, MULT_MP_10, MULT_MP_11,
  MULT_MP_12, MULT_MP_13, MULT_MP_14, MULT_MP_15, MULT_MP_16
]
// the above data structures are currently not used. There is the possibility of implementing
// them in the future to make the app able to resize dynamically
// the mvmt are to control movement when hit bottom
// the coeff are taken from MP_ constants. These are possibly to be used to dyamically
// make the coeffs in the future. For now these are manually calculated

export const MAP_POINT_OBJECTS: IMapPointObject[] = [  
  {'id':0,  'name':'OOB_LEFT',         'point': MP_0,   mvmtLat: 'right', 'coeff': [ 1, 1 ],             "display": "Starting" },
  {'id':1,  'name':'INITIAL_POSITION', 'point': MP_1,   mvmtLat: 'right', 'coeff': [ 0, 0 ],             "display": "Starting" },
  {'id':2,  'name':'SLOPE_LIMIT',      'point': MP_2,   mvmtLat: 'right', 'coeff': [ -0.0468, -0.2164 ], "display": "Continental Slope" },
  {'id':3,  'name':'START_BUMP',       'point': MP_3,   mvmtLat: 'left',  'coeff': [ -0.1823, -0.2618 ], "display": "Abyssal Plain" }, 
  {'id':4,  'name':'BUMP_PEAK',        'point': MP_4,   mvmtLat: 'left',  'coeff': [ -0.2239, -0.2115 ], "display": "Abyssal Hill" },
  {'id':5,  'name':'END_BUMP',         'point': MP_5,   mvmtLat: 'right', 'coeff': [ -0.2552, -0.2618 ], "display": "Abyssal Plain" },
  {'id':6,  'name':'START_DBL',        'point': MP_6,   mvmtLat: 'left',  'coeff': [ -0.2781, -0.2618 ], "display": "Seamount" },
  {'id':7,  'name':'DBL_PEAK_1',       'point': MP_7,   mvmtLat: 'left',  'coeff': [ -0.3021, -0.1108 ], "display": "Seamount" },
  {'id':8,  'name':'DBL_PEAK_2',       'point': MP_8,   mvmtLat: 'both',  'coeff': [ -0.3437, -0.1208 ], "display": "Seamount" },
  {'id':9,  'name':'END_DBL',          'point': MP_9,   mvmtLat: 'right', 'coeff': [ -0.3646, -0.2422 ], "display": "Seamount" },
  {'id':10, 'name':'START_TRENCH',     'point': MP_10,  mvmtLat: 'both',  'coeff': [ -0.4115, -0.2618 ], "display": "Abyssal Plain" },
  {'id':11, 'name':'TRENCH_BOTTOM_L',  'point': MP_11,  mvmtLat: 'right', 'coeff': [ -0.4635, -0.8862 ], "display": "Marina Trench" },
  {'id':12, 'name':'TRENCH_BOTTOM_R',  'point': MP_12,  mvmtLat: 'both',  'coeff': [ -0.4791, -0.8862 ], "display": "Marina Trench" },
  {'id':13, 'name':'END_TRENCH',       'point': MP_13,  mvmtLat: 'left',  'coeff': [ -0.5312, -0.2618 ], "display": "Marina Trench" },
  {'id':14, 'name':'END_POSITION',     'point': MP_14,  mvmtLat: 'both',  'coeff': [ -0.5729, -0.2618 ], "display": "Volcanic Island" },
  {'id':15, 'name':'OOB_RIGHT',        'point': MP_15,  mvmtLat: 'left',  'coeff': [ -1, -0.2618 ],      "display": "There be Dragons" },
  {'id':16, 'name':'OOB_RIGHT_2',      'point': MP_16,  mvmtLat: 'left',  'coeff': [ -1, -0.2618 ],      "display": "There be Dragons" },
]

  

export const textObjects: ITextObject[] = [
{id: EUPHOTIC_PELAGIC, title: "EUPHOTIC PELAGIC", text: "The uppermost layer of the open ocean sunlight can penetrate allowing photosynthesis to occur. Flora consists of phytoplankton, microscopic plant-like organisms that harness sunlight. These microscopic plants serve as the foundation of the marine food web, providing nourishment for a wide range of organisms. They contribute significantly to global oxygen production and carbon dioxide absorption, playing a vital role in regulating the Earth's climate. Fauna includes zooplankton, small fish, squid, and jellyfish. Many species undertake vertical migrations, moving closer to the surface during the night to feed on phytoplankton and descending to deeper depths during the day to avoid predators. Larger marine animals, such as whales and dolphins, often rely on the abundant food resources found in the euphotic pelagic zone.Commercial fisheries, providing a substantial portion of the world's seafood supply. It claims a major role in carbon sequestration balancing global ecosystem. "}
,{id: EUPHOTIC_BENTHIC, title: "EUPHOTIC BENTHIC", text: "The euphotic benthic zone is a crucial region in the ocean where sunlight reaches, allowing for photosynthesis. It extends from the ocean surface to around 200 meters deep, supporting diverse flora and fauna. Marine algae, seagrasses, and phytoplankton thrive in this zone, providing oxygen and serving as the foundation of the food web. Zooplankton, corals, and other invertebrates inhabit the benthic habitats, offering food and shelter to various species. Geographically, the euphotic benthic zone is prevalent in coastal areas, influencing adjacent ecosystems like coral reefs and seagrass meadows. It plays a vital role in carbon cycling, nutrient dynamics, and maintaining marine biodiversity. Preserving this zone is crucial for sustaining ocean health and the intricate balance of marine ecosystems."}
,{id: DYSPHOTIC_PELAGIC, title: "DYPHOTIC PELAGIC", text: "Here the flora is primarily phytoplankton and zooplankton and some diatoms. The fauna is fish include the lanternfish, hatchetfish, and dragonfishs. These fish have evolved large eyes and bioluminescent organs, to navigate and communicate in the dimly lit environment. Cephalopods, shrimp, and jellyfish, are also found in this zone, all adapted to low light. It serves as a crucial feeding ground for migratory species, including whales and large predatory fish, as they follow the vertical migration of zooplankton from the depths to the surface. Dead matter drifts down from the euphotic zone sustains sustaining a complex food web. Understanding the dysphotic pelagic zone is essential for comprehending the dynamics of the global carbon cycle. The zone plays a crucial role in the sequestration of carbon dioxide through the biological pump, where carbon is transported from the surface to the deep ocean through sinking particles. This process helps regulate atmospheric carbon levels and mitigates climate change."}
,{id: DYSPHOTIC_BENTHIC, title: "DYSPHOTIC BENTHIC", text: "Here sunlight barely penetrates and darkness prevails. The flora is algae, fungi, and bacteria that have adapted to obtain energy through CHEMOSYNTHESIS or by consuming organic matter settling from above.The fauna includes deep-sea fish, sea cucumbers, sea stars, sea anemones, corals, sponges, and crustaceans. Here is a refuge for numerous species that seek shelter from predators in shallower zones. It is important for nutrient recycling and maintaining the balance of carbon. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs), are employed to investigate this zone."}
,{id: APHOTIC_PELAGIC, title: "APHOTIC PELAGIC", text: "In the absence of sunlight, this zone has low temperatures, high pressure, and limited nutrient availability. Despite these challenges, the zone is not devoid of life. Unique and highly adapted organisms inhabit this realm, relying on alternative energy sources and survival strategies. In this zone, the primary producers are CHEMOSYNTHETIC bacteria that derive energy from inorganic compounds, such as hydrogen sulfide or methane. These bacteria serve as the foundation of the food chain, supporting a variety of organisms that are adapted to survive in extreme conditions. Deep-sea fish, cephalopods, and other invertebrates, some with bioluminescent abilities, are found here.The aphotic pelagic zone plays a significant role in the cycling of organic matteand the global carbon cycle. Organic particles, called marine snow, sink from the surface waters providing sustenance. The marine snow transports carbon from the surface to the deep ocean, sequestering it for long periods and influencing the planet's carbon balance."}
,{id: APHOTIC_BENTHIC, title: "APHOTIC BENTHIC", text:"There is no light. It is usually just above freezing and over 1000 times the pressure of the atmosphere. Most of this zone is nutrient poor however there is also the remarkable  presence of deep-sea vents. These hydrothermal vents are geological formations that spew forth mineral-rich, superheated water into the surrounding environment. They create a haven for unique ecosystems, sustained, again, not by sunlight but by chemosynthesis. Bacteria and other organisms near these vents convert chemicals, such as hydrogen sulfide, into energy, forming the basis of a food chain that supports a variety of organisms, including tube worms, clams, and unique species found nowhere else on Earth."}
]


