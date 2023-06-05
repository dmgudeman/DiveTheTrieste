// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit


import { LatMoveLimit, DepthObject, ITextObject, IMapPointObject} from './types';
import CalcConstant from './calcConstant';
import { callbackify } from 'util';
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

const calcConstant = new CalcConstant();
const initialValues = InitialValues.getInstance();

// values
export const SURFACE = 100;
export const DEPTH_CONT_SHELF = 450;
export const SEA_DEPTH = 36161; // feet
export const OCEAN_BOTTOM = 1560;
export const OCEAN_FLOOR = 1560;
export const DIST_CA_TO_TRENCH = 6000; //miles

// velocities
export const LAT_VELOCITY = 20;
export const VERTICAL_VELOCITY = 20;

//vertical for messages and images
export const B_P_BARRIER = 200;
export const CONT_SHELF_BENTHIC = DEPTH_CONT_SHELF - 150;
export const E_D_BARRIER = SURFACE + 200;
export const D_A_BARRIER = SURFACE + 500;   // dysphotic_aphotic_barrier
export const APHOTIC_BENTHIC_BARRIER = OCEAN_BOTTOM - 400;

// flags
export const STOP_OCEAN_LAT = 'stop_ocean_lateral';
export const STOP_SUB_LAT = 'stop_sub_lateral';
export const STOP_OCEAN_VERTICAL = 'stop_ocean_vertical';
export const STOP_SUB_VERTICAL = 'stop_sub_vertical';

// for messaging and photos
export const EUPHOTIC_PELAGIC: number = 0;
export const EUPHOTIC_BENTHIC: number = 1;
export const DYSPHOTIC_PELAGIC: number = 2;
export const DYSPHOTIC_BENTHIC: number = 3;
export const APHOTIC_PELAGIC: number = 4;
export const APHOTIC_BENTHIC: number = 5;


const MP_0 :number[] = [ initialValues.getInitial_X(),  initialValues.getInitial_Y() ];
const MP_1 :number[] = [ 0, 0];
const MP_2 :number[] = [ -180, -400 ];
const MP_3 :number[] = [ -460, -475 ];
const MP_4 :number[] = [ -860, -380 ];
const MP_5 :number[] = [ -980, -485 ];
const MP_6 :number[] = [ -1060, -460 ];
const MP_7 :number[] = [ -1180, -200 ];
const MP_8 :number[] = [ -1320, -240 ];
const MP_9 :number[] = [ -1400, -450 ];
const MP_10 :number[] = [ -1580, -500 ];
const MP_11 :number[] = [ -1720, -1560 ];
const MP_12 :number[] = [ -1840, -1560 ];
const MP_13 :number[] = [ -2040, -480 ];
const MP_14 :number[] = [ -initialValues.getFullLatLimit(), -initialValues.getFullVertLimit()];
const MP_15 :number[] = [ -initialValues.getWidth(), -initialValues.getHeight()];
const MP_16 :number[]  = [ -initialValues.getWidth(), -initialValues.getHeight()];

export const MAP_POINTS: number[][] = [
  MP_0, MP_1, MP_2, MP_3,
  MP_4, MP_5, MP_6, MP_7,
  MP_8, MP_9, MP_10, MP_11,
  MP_12, MP_13, MP_14, MP_15,
]

const MULT_MP_0 :number[] = [ 0, 0 ];
const MULT_MP_1 :number[] = [ 0, 0 ];
const MULT_MP_2 :number[] = [ -0.0468, -1 ];
const MULT_MP_3 :number[] = [ -0.1823, -1 ];
const MULT_MP_4 :number[] = [ -0.2239, -1 ];
const MULT_MP_5 :number[] = [ -0.2552, -1 ];
const MULT_MP_6 :number[] = [ -0.2781, -1 ];
const MULT_MP_7 :number[] = [ -0.3021, -1];
const MULT_MP_8 :number[] = [ -0.34375, -1];
const MULT_MP_9 :number[] = [ -0.3646, -1];
const MULT_MP_10 :number[] = [ -0.4115, -1];
const MULT_MP_11 :number[] = [ -0.4479, -1];
const MULT_MP_12 :number[] = [ -0.4791, -1];
const MULT_MP_13 :number[] = [ -0.5312, -1];

const MULT_MP_14 :number[] = [ -0.5729, - 1];
const MULT_MP_15 :number[] = [ -1, -1];
const MULT_MP_16 :number[] = [ -1, -1];



export const MAP_POINT_OBJECTS: IMapPointObject[] = [  // the x, xll, y, yll are for slope, the mvmt are to control movement when hit bottom
  {'id':0, 'name':'OOB_LEFT',         'point': MP_0,   mvmtLat: 'right', 'coeff': MULT_MP_0 },
  {'id':1, 'name':'INITIAL_POSITION', 'point': MP_1,   mvmtLat: 'right', 'coeff': MULT_MP_1 },
  {'id':2, 'name':'SLOPE_LIMIT',      'point': MP_2,   mvmtLat: 'right', 'coeff': MULT_MP_2 },
  {'id':3, 'name':'START_BUMP',       'point': MP_3,   mvmtLat: 'left',  'coeff': MULT_MP_3 }, 
  {'id':4, 'name':'BUMP_PEAK',        'point': MP_4,   mvmtLat: 'both',  'coeff': MULT_MP_4 },
  {'id':5, 'name':'END_BUMP',         'point': MP_5,   mvmtLat: 'right', 'coeff': MULT_MP_5 },
  {'id':6, 'name':'START_DBL',        'point': MP_6,   mvmtLat: 'right', 'coeff': MULT_MP_6 },
  {'id':7, 'name':'DBL_PEAK_1',       'point': MP_7,   mvmtLat: 'left',  'coeff': MULT_MP_7 },
  {'id':8, 'name':'DBL_PEAK_2',       'point': MP_8,   mvmtLat: 'both',  'coeff': MULT_MP_8 },
  {'id':9, 'name':'END_DBL',          'point': MP_9,   mvmtLat: 'right', 'coeff': MULT_MP_9 },
  {'id':10, 'name':'START_TRENCH',    'point': MP_10,  mvmtLat: 'right', 'coeff': MULT_MP_10 },
  {'id':11, 'name':'TRENCH_BOTTOM_L', 'point': MP_11,  mvmtLat: 'right', 'coeff': MULT_MP_11 },
  {'id':12, 'name':'TRENCH_BOTTOM_R', 'point': MP_12,  mvmtLat: 'both',  'coeff': MULT_MP_12 },
  {'id':13, 'name':'END_TRENCH',      'point': MP_13,  mvmtLat: 'left',  'coeff': MULT_MP_13 },
  {'id':14, 'name':'END_POSITION',    'point': MP_14,  mvmtLat: 'left',  'coeff': MULT_MP_14 },
  {'id':15, 'name':'OOB_RIGHT',       'point': MP_15,  mvmtLat: 'left',  'coeff': MULT_MP_15 },
  {'id':16, 'name':'OOB_RIGHT_2',     'point': MP_16,  mvmtLat: 'left',  'coeff': MULT_MP_16 },
]


// export const LAT_LIMITS_EXT: DepthObject[] = [  // the x, xll, y, yll are for slope, the mvmt are to control movement when hit bottom
//   {'id':0, 'name':'OOB_LEFT',         x: -0,    xll: -0,    y: -0,    yll: -0,    mvmtLat: 'right'},
//   {'id':1, 'name':'INITIAL_POSITION', x: -0,    xll: -0,    y: -0,    yll: -0,    mvmtLat: 'right'},
//   {'id':2, 'name':'SLOPE_LIMIT',      x: -180,  xll: -1,    y: -400,  yll: -1,    mvmtLat: 'right'},
//   {'id':3, 'name':'START_BUMP',       x: -630,  xll: -181,  y: -475,  yll: -401,  mvmtLat: 'left'}, 
//   {'id':4, 'name':'BUMP_PEAK',        x: -720,  xll: -631,  y: -380,  yll: -476,  mvmtLat: 'both'},
//   {'id':5, 'name':'END_BUMP',         x: -800,  xll: -721,  y: -485,  yll: -381,  mvmtLat: 'right'},
//   {'id':6, 'name':'START_DBL',        x: -840,  xll: -801,  y: -460,  yll: -486,  mvmtLat: 'right'},
//   {'id':7, 'name':'DBL_PEAK_1',       x: -980,  xll: -841,  y: -200,  yll: -461,  mvmtLat: 'left'},
//   {'id':8, 'name':'DBL_PEAK_2',       x: -1120, xll: -981,  y: -240,  yll: -199,  mvmtLat: 'both'},
//   {'id':9, 'name':'END_DBL',          x: -1180, xll: -1121, y: -450,  yll: -239,  mvmtLat: 'right'},
//   {'id':10, 'name':'START_TRENCH',    x: -1320, xll: -1181, y: -500,  yll: -451,  mvmtLat: 'right'},
//   {'id':11,'name':'TRENCH_BOTTOM_L',  x: -1520, xll: -1321, y: -1560, yll: -501,  mvmtLat: 'right'},
//   {'id':12,'name':'TRENCH_BOTTOM_R',  x: -1640, xll: -1521, y: -1560, yll: -501,  mvmtLat: 'both'},
//   {'id':13, 'name':'END_TRENCH',      x: -1740, xll: -1641, y: -480,  yll: -1561, mvmtLat: 'left'},
//   {'id':14, 'name':'END_POSITION',    x: -2200, xll: -1741, y: -485,  yll: -481,  mvmtLat: 'left'},
//   {'id':15, 'name':'OOB_RIGHT',       x: -WIDTH, xll: -2201, y: -485, yll: -486,  mvmtLat: 'left'}
// ]







export const textObjects: ITextObject[] = [
{id: EUPHOTIC_PELAGIC, title: "EUPHOTIC PELAGIC", text: "The uppermost layer of the open ocean sunlight can penetrate allowing photosynthesis to occur. Flora consists of phytoplankton, microscopic plant-like organisms that harness sunlight. These microscopic plants serve as the foundation of the marine food web, providing nourishment for a wide range of organisms. They contribute significantly to global oxygen production and carbon dioxide absorption, playing a vital role in regulating the Earth's climate. Fauna includes zooplankton, small fish, squid, and jellyfish. Many species undertake vertical migrations, moving closer to the surface during the night to feed on phytoplankton and descending to deeper depths during the day to avoid predators. Larger marine animals, such as whales and dolphins, often rely on the abundant food resources found in the euphotic pelagic zone.Commercial fisheries, providing a substantial portion of the world's seafood supply. It claims a major role in carbon sequestration balancing global ecosystem. "}
,{id: EUPHOTIC_BENTHIC, title: "EUPHOTIC BENTHIC", text: "The euphotic benthic zone is a crucial region in the ocean where sunlight reaches, allowing for photosynthesis. It extends from the ocean surface to around 200 meters deep, supporting diverse flora and fauna. Marine algae, seagrasses, and phytoplankton thrive in this zone, providing oxygen and serving as the foundation of the food web. Zooplankton, corals, and other invertebrates inhabit the benthic habitats, offering food and shelter to various species. Geographically, the euphotic benthic zone is prevalent in coastal areas, influencing adjacent ecosystems like coral reefs and seagrass meadows. It plays a vital role in carbon cycling, nutrient dynamics, and maintaining marine biodiversity. Preserving this zone is crucial for sustaining ocean health and the intricate balance of marine ecosystems."}
,{id: DYSPHOTIC_PELAGIC, title: "DYPHOTIC PELAGIC", text: "Here the flora is primarily phytoplankton and zooplankton and some diatoms. The fauna is fish include the lanternfish, hatchetfish, and dragonfishs. These fish have evolved large eyes and bioluminescent organs, to navigate and communicate in the dimly lit environment. Cephalopods, shrimp, and jellyfish, are also found in this zone, all adapted to low light. It serves as a crucial feeding ground for migratory species, including whales and large predatory fish, as they follow the vertical migration of zooplankton from the depths to the surface. Dead matter drifts down from the euphotic zone sustains sustaining a complex food web. Understanding the dysphotic pelagic zone is essential for comprehending the dynamics of the global carbon cycle. The zone plays a crucial role in the sequestration of carbon dioxide through the biological pump, where carbon is transported from the surface to the deep ocean through sinking particles. This process helps regulate atmospheric carbon levels and mitigates climate change."}
,{id: DYSPHOTIC_BENTHIC, title: "DYSPHOTIC BENTHIC", text: "Here sunlight barely penetrates and darkness prevails. The flora is algae, fungi, and bacteria that have adapted to obtain energy through CHEMOSYNTHESIS or by consuming organic matter settling from above.The fauna includes deep-sea fish, sea cucumbers, sea stars, sea anemones, corals, sponges, and crustaceans. Here is a refuge for numerous species that seek shelter from predators in shallower zones. It is important for nutrient recycling and maintaining the balance of carbon. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs), are employed to investigate this zone."}
,{id: APHOTIC_PELAGIC, title: "APHOTIC PELAGIC", text: "In the absence of sunlight, this zone has low temperatures, high pressure, and limited nutrient availability. Despite these challenges, the zone is not devoid of life. Unique and highly adapted organisms inhabit this realm, relying on alternative energy sources and survival strategies. In this zone, the primary producers are CHEMOSYNTHETIC bacteria that derive energy from inorganic compounds, such as hydrogen sulfide or methane. These bacteria serve as the foundation of the food chain, supporting a variety of organisms that are adapted to survive in extreme conditions. Deep-sea fish, cephalopods, and other invertebrates, some with bioluminescent abilities, are found here.The aphotic pelagic zone plays a significant role in the cycling of organic matteand the global carbon cycle. Organic particles, called marine snow, sink from the surface waters providing sustenance. The marine snow transports carbon from the surface to the deep ocean, sequestering it for long periods and influencing the planet's carbon balance."}
,{id: APHOTIC_BENTHIC, title: "APHOTIC BENTHIC", text:"There is no light. It is usually just above freezing and over 1000 times the pressure of the atmosphere. Most of this zone is nutrient poor however there is also the remarkable  presence of deep-sea vents. These hydrothermal vents are geological formations that spew forth mineral-rich, superheated water into the surrounding environment. They create a haven for unique ecosystems, sustained, again, not by sunlight but by chemosynthesis. Bacteria and other organisms near these vents convert chemicals, such as hydrogen sulfide, into energy, forming the basis of a food chain that supports a variety of organisms, including tube worms, clams, and unique species found nowhere else on Earth."}
]


