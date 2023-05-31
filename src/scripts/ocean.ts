
import { WIDTH, HEIGHT } from "../index";

class Ocean {
    private static instance: Ocean;
    private ctx: CanvasRenderingContext2D;
    private sx: number;
    private sy: number;
    private sWidth: number;
    private sHeight: number;
    private oceanImage: HTMLImageElement | null;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
  
    private constructor(
        ctx: CanvasRenderingContext2D,
        sx?: number,
        sy?: number,
        sWidth?: number,
        sHeight?: number,
        oceanImage?: HTMLImageElement | null,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
       
      ) {
        this.ctx = ctx;
        this.sx = sx || 0;
        this.sy = sy || 0;
        this.sWidth = sWidth || WIDTH;
        this.sHeight = sHeight || HEIGHT;
        this.oceanImage = oceanImage || document.getElementById("crossSection") as HTMLImageElement | null
        this.velRight = velRight || 0;
        this.velLeft = velLeft || 0;
        this.velUp = velUp || 0;
        this.velDown = velDown || 0;
    }
    public static getInstance(options: {
        ctx: CanvasRenderingContext2D;
        sx?: number;
        sy?: number;
        sWidth?: number;
        sHeight?: number;
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
