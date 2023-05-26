import {WIDTH, HEIGHT} from '../index';


export const stopMessageAnimation = {
    messFlag: true
  };

// values
export const SURFACE = 100;
export const DEPTH_CONT_SHELF = 450;
export const SEA_DEPTH = 36161;

//lateral
export const B_P_BARRIER = 200;
export const LEFT_EDGE_TRENCH = 1211;
export const RIGHT_EDGE_TRENCH = WIDTH - 200;
//vertical
export const CONT_SHELF_BENTHIC = DEPTH_CONT_SHELF - 150;
export const E_D_BARRIER = SURFACE + 200;
export const D_A_BARRIER = HEIGHT - 400;   // dysphotic_aphotic_barrier
export const APHOTIC_BENTHIC_BARRIER = OCEAN_BOTTOM - 200;
export const OCEAN_BOTTOM = HEIGHT - 100;
// object option values
export const OCEAN_DEPTH_LIMIT = 820;
export const OCEAN_LAT_LIMIT = 1271;
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

