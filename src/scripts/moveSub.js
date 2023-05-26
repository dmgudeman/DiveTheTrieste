import {
    DEPTH_CONT_SHELF,
    INITIAL_Y_POSITION,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    SEA_DEPTH,
    STOP_OCEAN_LAT,
    STOP_SUB_LAT,
    STOP_OCEAN_VERTICAL,
    STOP_SUB_VERTICAL,
    OCEAN_DEPTH_LIMIT,
    OCEAN_LAT_LIMIT,
    FULL_LAT_LIMIT,
    FULL_VERTICAL_LIMIT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    INITIAL_LAT,
    INITIAL_DEPTH,
    SUB_INITIAL_LAT_POS,
    SLOPE_LAT,
    SLOPE_DEPTH,
    SHELF_DEPTH,
    TRENCH_DEPTH,
    SURFACE,
    D_A_BARRIER,
    APHOTIC_BENTHIC_BARRIER,
    OCEAN_BOTTOM,
} from "./constants";
import { HEIGHT } from "../index";
import { globalOcean, globalSub } from "../index";


export function getDisplaySub(ocean, sub) {
 

    // let ocean = globalOcean.ocean;
    // let sub = globalSub.sub;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
  
    console.log("compLat2", compLat);
    console.log("compVert2", compVert);
   

    let displayObjects = { ocean: ocean, sub: sub, mover: 'sub'};
    /// this returns the velocity and which object is to move;
    // Out of bounds to the left
    if (compLat < STOP_OCEAN_LAT) {
      console.log('COMPLAT LESS THAN OCEAN LAT  SUBBBBB', compLat)
     
        // out of bounds above
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            sub.y = STOP_OCEAN_VERTICAL;
            sub.x = STOP_OCEAN_LAT;
          
        } else if (compVert <= SHELF_DEPTH) {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            sub.x = STOP_OCEAN_LAT;
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
            sub.x = STOP_OCEAN_LAT;
            sub.y = SHELF_DEPTH
        }
    } else if (compLat <= LEFT_EDGE_TRENCH) {
      console.log('COMPLAT LESS THAN LEFT EDGE TRENCH SUB', compLat)
        
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            sub.y = STOP_OCEAN_VERTICAL;
        
        } else if (compVert <= SHELF_DEPTH) {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
            sub.x = STOP_OCEAN_LAT;
            sub.y = SHELF_DEPTH
            sub.velDown = 0;
        }
    } else if (compLat <= RIGHT_EDGE_TRENCH ) {
      console.log('COMPLAT LESS THAN RIGHT EDGE LAT SUB', compLat)
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds vertical
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            sub.y = STOP_OCEAN_VERTICAL;
       
        } else if (compVert <= OCEAN_BOTTOM) {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
               
        } else if (compVert > OCEAN_BOTTOM)  { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
            sub.y = OCEAN_BOTTOM;
           
        }
    } else if (compLat <= FULL_LAT_LIMIT) {
        console.log('COMPLAT LESS THAN FULL LATERAL', compLat)
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            sub.y = STOP_OCEAN_VERTICAL;
        
        } else if (compVert <= SHELF_DEPTH) {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
            
            sub.y = SHELF_DEPTH
            sub.velDown = 0;
        }
    } else if (compLat > FULL_LAT_LIMIT ) { // out of bounds right
            ocean.sx = OCEAN_LAT_LIMIT;
            sub.x = FULL_LAT_LIMIT;
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight =0;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            sub.y = STOP_OCEAN_VERTICAL; //reset sub
        
        } else if (compVert <= SHELF_DEPTH) {
            sub.velRight = 0
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            sub.velRight = 0
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
            sub.y = SHELF_DEPTH
            
        }
    }

    // displayObjects.ocean = ocean;
    // displayObjects.sub = sub;
    console.log( 'sub.velRight', sub.velRight )

    // console.log(displayObjects);
    // console.log("sub", sub);
    // console.log("ocean", ocean);
    return displayObjects;
}