



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