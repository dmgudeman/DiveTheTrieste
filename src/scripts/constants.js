import {WIDTH, HEIGHT} from '../index';


export const stopMessageAnimation = {
    messFlag: true
  };

// values
export const SURFACE = 100;
export const DEPTH_CONT_SHELF = 450;
export const SEA_DEPTH = 36161;
export const OCEAN_BOTTOM = HEIGHT - 100;

// velocities
export const LAT_VELOCITY = 20;
export const VERTICAL_VELOCITY = 20;

//lateral for setting depths for movement
export const INITIAL_LAT = 80;
export const INITIAL_DEPTH = 25;
export const SLOPE_LAT = 200;
export const SLOPE_DEPTH = 300;
export const SHELF_DEPTH = DEPTH_CONT_SHELF;
export const TRENCH_DEPTH = OCEAN_BOTTOM;
export const LEFT_EDGE_TRENCH = 1211;
export const RIGHT_EDGE_TRENCH = WIDTH - 200;
//vertical for messages and images
export const B_P_BARRIER = 200;
export const CONT_SHELF_BENTHIC = DEPTH_CONT_SHELF - 150;
export const E_D_BARRIER = SURFACE + 200;
export const D_A_BARRIER = HEIGHT - 400;   // dysphotic_aphotic_barrier
export const APHOTIC_BENTHIC_BARRIER = OCEAN_BOTTOM - 200;

// OBJECT option values
export const OCEAN_DEPTH_LIMIT = 820;
export const OCEAN_LAT_LIMIT = 1271;
export const FULL_LAT_LIMIT = WIDTH - 100;
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

