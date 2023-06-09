import Images from "./images";
import InitialValues from "./initialValues";
import Ocean from "./ocean";
import Sub from "./sub";

class Cockpit {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private InitialValues: InitialValues;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private cockpitImage: HTMLImageElement;
    private cockpitImageUrl: string;
    private underImageUrl: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.InitialValues = InitialValues.getInstance();
        this.x = 0;
        this.y = 0;
        this.width = this.InitialValues.getWidth();
        this.height = this.InitialValues.getHeight();
        this.cockpitImage = document.getElementById(
            "cockpit"
        ) as HTMLImageElement;
        this.cockpitImageUrl = "src/assets/cockpit.png";
        this.underImageUrl = "assets/life/ep/001_shark.jpg";
    }

    draw() {
        let underImage = new Image();
        let images = new Images();
        underImage.src = images.getImage();
        this.width = this.InitialValues.getWidth();
        this.height = this.InitialValues.getHeight();

        underImage.onload = () => {
            // image in cockpit porthole
            this.ctx.drawImage(
                underImage,
                this.width * 0.07,
                0,
                this.width * 0.35,
                this.height * 0.41
            );
            let cockpitImage = new Image();
            cockpitImage.src = this.cockpitImageUrl;
            cockpitImage.onload = () => {
                // cockpit image
                this.ctx.drawImage(
                    cockpitImage,
                    this.x,
                    this.y,
                    this.width * 0.5,
                    this.height * 0.5
                );
                cockpitImage.style.zIndex = "55";
            };
        };
    }

    // future implementation
    debounceDraw(delay: number) {
        let debounceTimer;
        return () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.draw(), delay);
        };
    }
}

export default Cockpit;
