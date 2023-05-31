
import { WIDTH, HEIGHT } from "../index";

class Ocean {
    private static instance: Ocean;
    private ctx: CanvasRenderingContext2D;
    private sx: number;
    private sy: number;
    private sWidth: number;
    private sHeight: number;
    private dx: number;
    private dy: number;
    private dWidth: number;
    private dHeight: number;
    private oceanImage: HTMLImageElement | null;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
  
    private constructor(options: {
        ctx: CanvasRenderingContext2D;
        sx?: number;
        sy?: number;
        sWidth?: number;
        sHeight?: number;
        dx?: number;
        dy?: number;
        dWidth?: number;
        dHeight?: number;
        oceanImage?: HTMLImageElement | null;
        velRight?: number;
        velLeft?: number;
        velUp?: number;
        velDown?: number;
       
      }) {
        this.ctx = options.ctx;
        // keeps track of the movement of the background
        this.sx = options.sx || 0;
        this.sy = options.sy || 0;
        this.sWidth = options.sWidth || WIDTH;
        this.sHeight = options.sHeight || HEIGHT;
        this.dx = options.dx || 0;
        this.dy = options.dy || 0;
        // is the position on the canvas
        this.dWidth = options.dWidth || WIDTH;
        this.dHeight = options.dHeight || HEIGHT;
        this.oceanImage = options.oceanImage || document.getElementById("crossSection") as HTMLImageElement | null
        this.velRight = options.velRight || 0;
        this.velLeft = options.velLeft || 0;
        this.velUp = options.velUp || 0;
        this.velDown = options.velDown || 0;
    }
    public static getInstance(options: {
        ctx: CanvasRenderingContext2D;
        sx?: number;
        sy?: number;
        sWidth?: number;
        sHeight?: number;
        dx?: number;
        dy?: number;
        dWidth?: number;
        dHeight?: number;
        oceanImage?: HTMLImageElement | null;
        velRight?: number;
        velLeft?: number;
        velUp?: number;
        velDown?: number;
    }): Ocean {
        if (!Ocean.instance) {
            Ocean.instance = new Ocean(options);
        }
        return Ocean.instance;
    }
    public draw() {
        this.ctx.drawImage(
            this.oceanImage,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.dx,
            this.dy,
            this.dWidth,
            this.dHeight
        );
    }

    public getSx(): number {
        return this.sx;
    }

    public setSx(sx: number): void {
        this.sx = sx;
    }
    public getSy(): number {
        return this.sy;
    }

    public setSy(sy: number): void {
        this.sy = sy;
    }


    public getVelRight(): number {
        return this.velRight;
    }

    public setVelx(velRight: number): void {
        this.velRight = velRight;
    }

    public getVelLeft(): number {
        return this.velLeft;
    }

    public setVelLeft(velLeft: number): void {
        this.velLeft = velLeft;
    }
    public getVelUp(): number {
        return this.velUp;
    }

    public setVelUp(velUp: number): void {
        this.velUp = velUp;
    }
    public getVelDown(): number {
        return this.velDown;
    }

    public setVelDown(velDown: number): void {
        this.velDown = velDown;
    }
}
export default Ocean;
