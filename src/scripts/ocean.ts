import { WIDTH, HEIGHT } from "../index";
import { LAT_VELOCITY, VERTICAL_VELOCITY } from "./constants";
import {eventBus} from './eventBus';

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
        velDown?: number
    ) {
        this.ctx = ctx;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || WIDTH;
        this.height = height || HEIGHT;
        this.oceanImage =
            oceanImage ||
            (document.getElementById(
                "crossSection"
            ) as HTMLImageElement | null);
        this.velRight = velRight || 0;
        this.velLeft = velLeft || 0;
        this.velUp = velUp || 0;
        this.velDown = velDown || 0;
    }
    
    public static getInstance( ctx?: CanvasRenderingContext2D ): Ocean {
        if (!Ocean.instance) {
            if (!ctx) {
                throw new Error(
                    "A context must be provided when creating a new instance."
                );
            }
            Ocean.instance = new Ocean(
                ctx,
                0,
                0,
                WIDTH,
                HEIGHT,
                document.getElementById(
                    "crossSection"
                ) as HTMLImageElement,
                0,
                0,
                0,
                0
            );
        }
        return Ocean.instance;
    }
    public draw() {
        this.ctx.drawImage(
            this.oceanImage,
            this.x,
            this.y,
            this.width,
            this.height
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

    public setVelRight(): void {
        this.velRight = LAT_VELOCITY;
    }

    public getVelLeft(): number {
        return this.velLeft;
    }

    public setVelLeft(): void {
        this.velLeft = LAT_VELOCITY;
    }
    public getVelUp(): number {
        return this.velUp;
    }

    public setVelUp(): void {
        this.velUp = VERTICAL_VELOCITY;
    }
    public getVelDown(): number {
        return this.velDown;
    }

    public setVelDown(): void {
        this.velDown = VERTICAL_VELOCITY;
    }

    public setVelDownReg(vel:number):void{
        this.velDown = vel;
    }

    public zeroVelRight(): void {
        this.velRight = 0;
    }

    public zeroVelLeft(): void {
        this.velLeft = 0;
    }

    public zeroVelUp(): void {
        this.velUp = 0;
    }

    public zeroVelDown(): void {
        this.velDown = 0;
    }


}
export default Ocean;
