import {
    OCEAN_DEPTH_LIMIT,
    OCEAN_LAT_LIMIT,
    INITIAL_Y_POSITION,
} from "./constants";
import { WIDTH, HEIGHT } from "../index";

class Ocean {
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
    private vely: number;
    private velx: number;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
    private surface_y: number;
    private depthLimit: number;
    private lateralLimit: number;
  
    constructor(options: {
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
        vely?: number;
        velx?: number;
        velRight?: number;
        velLeft?: number;
        velUp?: number;
        velDown?: number;
        surface_y?: number;
        depthLimit?: number;
        lateralLimit?: number;
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
        this.vely = options.vely || 0;
        this.velx = options.velx || 0;
        this.velRight = options.velRight || 0;
        this.velLeft = options.velLeft || 0;
        this.velUp = options.velUp || 0;
        this.velDown = options.velDown || 0;
        this.surface_y = options.surface_y || INITIAL_Y_POSITION;
        this.depthLimit = options.depthLimit || OCEAN_DEPTH_LIMIT; // this is where sub movement takes over
        this.lateralLimit = options.lateralLimit || OCEAN_LAT_LIMIT; // ditto
    }

    draw() {
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
