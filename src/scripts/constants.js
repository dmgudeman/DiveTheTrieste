// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit

import {WIDTH, HEIGHT} from '../index';

export const stopMessageAnimation = {
    messFlag: true
  };
  
  let _CURRENT_CANVAS = 2;
  export const getCurrentCanvas = () => _CURRENT_CANVAS; 
  export const setCurrentCanvas = (value) => {
    if (value === 1 || value === 2 || value === 3) {
      _CURRENT_CANVAS = value;
    } else {
      console.error('Invalid canvas value. Please provide a value of 1, 2, or 3.');
    }
  };



// values
export const SURFACE = 100;
export const DEPTH_CONT_SHELF = 450;
export const SEA_DEPTH = 36161;
export const OCEAN_BOTTOM = 1560;
export const OCEAN_FLOOR = 1560;

// velocities
export const LAT_VELOCITY = 20;
export const VERTICAL_VELOCITY = 20;

//lateral for setting depths for movement
export const INITIAL_LAT = 80;
export const INITIAL_DEPTH = 25;
export const SLOPE_LAT = 190;
export const SLOPE_DEPTH = 300;
export const SHELF_DEPTH = DEPTH_CONT_SHELF;
export const TRENCH_TOP = 500;
export const TRENCH_DEPTH = OCEAN_BOTTOM;

export const LEFT_EDGE_TRENCH = 1400;
export const RIGHT_EDGE_TRENCH = 1800;
//vertical for messages and images
export const B_P_BARRIER = 200;
export const CONT_SHELF_BENTHIC = DEPTH_CONT_SHELF - 150;
export const E_D_BARRIER = SURFACE + 200;
export const D_A_BARRIER = SURFACE + 500;   // dysphotic_aphotic_barrier
export const APHOTIC_BENTHIC_BARRIER = OCEAN_BOTTOM - 400;

// OBJECT option values
export const OCEAN_DEPTH_LIMIT = 820;
export const OCEAN_LAT_LIMIT = 1280;
export const FULL_LAT_LIMIT = 2200;
export const FULL_VERTICAL_LIMIT = HEIGHT - 100;
export const INITIAL_Y_POSITION = 80; // for both objects
export const SUB_INITIAL_LAT_POS = 800;

// flags
export const STOP_OCEAN_LAT = 'stop_ocean_lateral';
export const STOP_SUB_LAT = 'stop_sub_lateral';
export const STOP_OCEAN_VERTICAL = 'stop_ocean_vertical';
export const STOP_SUB_VERTICAL = 'stop_sub_vertical';
// for messaging and photos
export const APHOTIC_PELAGIC = 'aphotic_pelagic';
export const APHOTIC_BENTHIC = 'aphotic_benthic';
export const DYSPHOTIC_PELAGIC = 'dysphotic_pelagic';
export const DYSPHOTIC_BENTHIC = 'dsyphotic_benthic';
export const EUPHOTIC_PELAGIC = 'euphotic_pelagic';
export const EUPHOTIC_BENTHIC = 'euphotic_benthic';


export const LAT_LIMIT_00_0_0= [0,0];
export const LAT_LIMIT_01_220_420= [220, 380];
export const LAT_LIMIT_02_620_480 = [620, 420];
export const LAT_LIMIT_03_720_380 = [720, 260];
export const LAT_LIMIT_04_860_500 = [860, 460];
export const LAT_LIMIT_05_1000_200 = [1000, 160];
export const LAT_LIMIT_06_1100_200 = [1100, 160];
export const LAT_LIMIT_07_1200_460 = [1200, 420];
export const LAT_LIMIT_08_1280_480= [1400, 440]; //same as LEFT_EDGE_TRENCH


export const LAT_LIMITS = [  // the x, xll, y, yll are for slope, the mvmt are to control movement when hit bottom
  {'id':0, 'name':'INITIAL_POSITION', x:0,   xll: 0,   y:0,   yll: 0,    mvmtL: 'R', mvmtV:  null},
  {'id':1, 'name':'SLOPE_LIMIT',      x:180, xll: 1,   y:400, yll: 1,    mvmtL: 'R', mvmtV: 'U'},
  {'id':2, 'name':'START_BUMP',       x:630, xll: 181, y:450, yll: 401,  mvmtL: 'L', mvmtV: 'U'}, 
  {'id':3, 'name':'BUMP_PEAK',        x:720, xll: 631, y:380, yll: 451,  mvmtL: 'B', mvmtV: 'U'},
  {'id':4, 'name':'END_BUMP',         x:800, xll: 721, y:460, yll: 381,  mvmtL: 'R', mvmtV: 'U'},
  {'id':5, 'name':'START_DBL',        x:840, xll: 801, y:460, yll: 461,  mvmtL: 'B', mvmtV: 'U'},
  {'id':6, 'name':'DBL_PEAK_1',       x:980, xll: 841, y:200, yll: 461,  mvmtL: 'B', mvmtV: 'U'},
  {'id':7, 'name':'DBL_PEAK_2',       x:1120,xll: 981, y:240, yll: 199,  mvmtL: 'B', mvmtV: 'U'},
  {'id':8, 'name':'END_DBL',          x:1180,xll: 1121,y:450, yll: 239,  mvmtL: 'R', mvmtV: 'U'},
  {'id':9, 'name':'START_TRENCH',     x:1320,xll: 1181,y:500, yll: 451,  mvmtL: 'B', mvmtV: 'U'},
  {'id':10,'name':'TRENCH_BOTTOM',    x:1600,xll: 1321,y:1560, yll: 501, mvmtL: 'R', mvmtV: 'U'},
  {'id':11, 'name':'END_TRENCH',      x:1740,xll: 1601,y:480, yll: 1561, mvmtL: 'L', mvmtV: 'U'},
  {'id':12, 'name':'END_POSITION',    x:2200,xll: 1741,y:485, yll: 481,  mvmtL: 'L', mvmtV: 'U'},
]



