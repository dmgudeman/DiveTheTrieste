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
import { WIDTH } from "../index";
import { globalOcean, globalSub } from "../index";


export function getDisplaySub(ocean, sub) {
 

    // let ocean = globalOcean.ocean;
    // let sub = globalSub.sub;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
  
    console.log("compLat2", compLat);
    console.log("compVert2", compVert);
  
   

    let displayObjects = { ocean: ocean, sub: sub, mover: null};
   
    if (compLat < STOP_OCEAN_LAT) { // out of bounds to the left
      console.log('COMPLAT LESS THAN OCEAN LAT  SUBBBBB', compLat) 
        if (compVert < 0 ) { //out of bounds above
            ocean.velUp = 0;
            ocean.velDown = VERTICAL_VELOCITY;
            ocean.velRight=  LAT_VELOCITY;
            ocean.velLeft = 0;
            sub.velRight = 0;
            sub.velLeft = 0;
            sub.velUp = 0;
            sub.velDown = 0;  
            displayObjects.mover = 'ocean';   
     
     } else if (compVert <= STOP_OCEAN_VERTICAL) {       
        } else if (compVert <= SHELF_DEPTH) {
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
            ocean.velRight= LAT_VELOCITY;
            ocean.velLeft = 0;
            sub.velRight = 0;
            sub.velLeft = 0;
            sub.velUp = 0;
            sub.velDown = 0;
            displayObjects.mover = 'ocean';   
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = 0;
            ocean.velRight= LAT_VELOCITY;
            ocean.velLeft = 0;
            sub.velRight = 0
            sub.velLeft = 0;
            sub.velUp = 0
            sub.velDown = 0;
            displayObjects.mover = 'ocean';   
        }
    } else if (compLat <= LEFT_EDGE_TRENCH) {
      console.log('COMPLAT LESS THAN LEFT EDGE TRENCH SUB', compLat)
        
        if (compVert <= STOP_OCEAN_VERTICAL) { 
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY
            ocean.velRight= 0
            ocean.velLeft = 0;
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = 0;
            displayObjects.mover = 'both';       
        } else if (compVert <= SHELF_DEPTH) {
            ocean.velUp = 0
            ocean.velDown = 0
            ocean.velRight= 0
            ocean.velLeft = 0;
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            displayObjects.mover = 'sub'; 
        } else if (compVert > SHELF_DEPTH) { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0; 
            sub.velDown = 0;
        }
    } else if (compLat <= RIGHT_EDGE_TRENCH ) {
      console.log('COMPLAT LESS THAN RIGHT EDGE LAT SUB', compLat)
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds vertical
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
         
       
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
            // sub.y = OCEAN_BOTTOM;
           
        }
    } else if (compLat <= FULL_LAT_LIMIT) {
        console.log('COMPLAT LESS THAN FULL LATERAL', compLat)
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            // sub.y = STOP_OCEAN_VERTICAL;
        
        } else if (compVert <= SHELF_DEPTH) {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
            
        } else if (compVert > OCEAN_BOTTOM) { //out of bounds below
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;     
            // sub.y = SHELF_DEPTH
        }
    } else if (compLat > FULL_LAT_LIMIT ) { // out of bounds right
            console.log('OUT OF BOUNDS RIGHT')
           
        if (compVert <= STOP_OCEAN_VERTICAL) { //out of bounds above
            sub.velRight =0;
            sub.velLeft = LAT_VELOCITY
            sub.velUp = 0;
            sub.velDown = VERTICAL_VELOCITY;
            // sub.y = STOP_OCEAN_VERTICAL; //reset sub
        
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
            // sub.y = SHELF_DEPTH
            
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