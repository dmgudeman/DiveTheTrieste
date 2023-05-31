
import { WIDTH, HEIGHT } from "../index";

class Ocean {
    private static instance: Ocean;
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private oceanImage: HTMLImageElement | null;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
  
    private constructor(
        ctx: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        oceanImage?: HTMLImageElement | null,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
       
      ) {
        this.ctx = ctx;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || WIDTH;
        this.height = height || HEIGHT;
        this.oceanImage = oceanImage || document.getElementById("crossSection") as HTMLImageElement | null
        this.velRight = velRight || 0;
        this.velLeft = velLeft || 0;
        this.velUp = velUp || 0;
        this.velDown = velDown || 0;
    }
    public static getInstance(
        ctx?: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        oceanImage?: HTMLImageElement | null,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
    ): Ocean {
        if (!Ocean.instance) {
            if (!ctx) {
                throw new Error('A context must be provided when creating a new instance.');
            }
            Ocean.instance = new Ocean(ctx, x, y, width, height, oceanImage, velRight, velLeft, velUp, velDown);
        }
        return Ocean.instance;
    }
    public draw() {
        this.ctx.drawImage(
            this.oceanImage,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }
    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }


    public getVelRight(): number {
        return this.velRight;
    }

    public setVelRight(velRight: number): void {
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
        console.log('IN OCEAN VELDOWN',this.velDown)
        return this.velDown;
    }

    public setVelDown(velDown: number): void {
        this.velDown = velDown;
    }
}
export default Ocean;
