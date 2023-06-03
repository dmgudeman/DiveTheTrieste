


// class StyleState {
//     private static instance: StyleState;
//     private canvasOcean:  HTMLCanvasElement;
//     private canvasOpening:  HTMLCanvasElement;
//     private canvasCockpit:  HTMLCanvasElement;
  


//     private constructor(
        
//         showCanvas1: Boolean,
//         showCanvas2: Boolean,
//         showCanvas3: Boolean,
//         ctx1?: CanvasRenderingContext2D,
//         ctx2?: CanvasRenderingContext2D,
//         ctx3?: CanvasRenderingContext2D,

//     ) {
//         showCanvas1 = false,
//         showCanvas2 = true,
//         showCanvas3 = false,
//         ctx1= null,
//         ctx2= null,
//         ctx3= null,

//     }

//     public static getInstance(
//         ctx?: CanvasRenderingContext2D,
//         x: number = SUB_INITIAL_LAT_POS,
//         y: number = 0,
//         width: number = 120,
//         height: number = 120,
//         velRight: number = 0,
//         velLeft: number = 0,
//         velUp: number = 0,
//         velDown: number = 0,
//         currentFrame: number = 0,
//         lastFrameTime: number = 0,
//         subImageSrc = "assets/sprite.png",
//         initialLatPos = SUB_INITIAL_LAT_POS,
//         initialVertPos = INITIAL_Y_POSITION

//     ): Sub {
//         if (!Sub.instance) {
//             if (!ctx) {
//                 throw new Error(
//                     "A context must be provided when creating a new instance."
//                 );
//             }
//             Sub.instance = new Sub(
//                 ctx,
//                 x,
//                 y,
//                 width,
//                 height,
//                 velRight,
//                 velLeft,
//                 velUp,
//                 velDown,
//                 subImageSrc,
//                 sprites,
//                 currentFrame,
//                 lastFrameTime,
//             );
//         }
//         return Sub.instance;
//     }





// }





    class StyleState {
        //     private static instance: StyleState;
            private canvasOcean:  HTMLCanvasElement;
            private canvasOpening:  HTMLCanvasElement;
            private canvasCockpit:  HTMLCanvasElement;
          
        
        
            constructor(
                
                canvasOcean: HTMLCanvasElement,
                canvasOpening: HTMLCanvasElement,
                canvasCockpit: HTMLCanvasElement,
            ) {

                this.canvasOcean = canvasOcean;
                this.canvasOpening = canvasOpening;
                this.canvasCockpit = canvasCockpit;

            }
            showCanvasOcean () {
                this.canvasOcean.hidden = false;
                this.canvasOpening.hidden = true;
                this.canvasCockpit.hidden = true;
            }

            showCanvasOpening () {
                this.canvasOcean.hidden = true;
                this.canvasOpening.hidden = false;
                this.canvasCockpit.hidden = true;
            }
            showCanvasCockpit () {
                this.canvasOcean.hidden = true;
                this.canvasOpening.hidden = true;
                this.canvasCockpit.hidden = false;
            }
    
}

export default StyleState;