import {
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
} from "./constants";
import { WIDTH, HEIGHT } from "../index";
import { ISprite } from "./types";

const sprites = [
    { x: 0, y: 0, width: 125, height: 200 },
    { x: 135, y: 0, width: 135, height: 200 },
    { x: 280, y: 0, width: 125, height: 200 },
    { x: 410, y: 0, width: 140, height: 200 },
];

class Sub {
    private static instance: Sub;
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private w: number;
    private h: number;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
    private subImageSrc: string; // this is the sprite sheet
    private spriteSheet: HTMLImageElement;
    private sprites: ISprite[];
    private currentFrame: number;
    private lastFrameTime: number;
    private initialLatPos: number;
    private initialVertPos: number;

    private constructor(
        ctx: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
        subImageSrc?: string,
        sprites?: ISprite[],
        currentFrame?: number,
        lastFrameTime?: number
    ) {
        this.ctx = ctx;
        this.x = x || SUB_INITIAL_LAT_POS;
        this.y = y || INITIAL_Y_POSITION;
        this.w = width || 120; // size of the sub in px
        this.h = height || 120; // size of the sub in px
        this.velRight = velRight || 0;
        this.velLeft = velLeft || 0;
        this.velUp = velUp || 0;
        this.velDown = velDown || 0;
        this.subImageSrc = subImageSrc || "assets/sprite.png";
        this.spriteSheet = new Image();
        this.spriteSheet.src = this.subImageSrc;
        this.sprites = sprites;
        this.currentFrame = currentFrame || 0;
        this.lastFrameTime = lastFrameTime || 0;
        this.initialLatPos = SUB_INITIAL_LAT_POS;
        this.initialVertPos = INITIAL_Y_POSITION;
        this.updateSprite = this.updateSprite.bind(this);
    }

    public static getInstance(
        ctx?: CanvasRenderingContext2D,
        x: number = SUB_INITIAL_LAT_POS,
        y: number = 0,
        width: number = 120,
        height: number = 120,
        velRight: number = 0,
        velLeft: number = 0,
        velUp: number = 0,
        velDown: number = 0,
        currentFrame: number = 0,
        lastFrameTime: number = 0,
        subImageSrc = "assets/sprite.png",
        initialLatPos = SUB_INITIAL_LAT_POS,
        initialVertPos = INITIAL_Y_POSITION

    ): Sub {
        if (!Sub.instance) {
            if (!ctx) {
                throw new Error(
                    "A context must be provided when creating a new instance."
                );
            }
            Sub.instance = new Sub(
                ctx,
                x,
                y,
                width,
                height,
                velRight,
                velLeft,
                velUp,
                velDown,
                subImageSrc,
                sprites,
                currentFrame,
                lastFrameTime,
            );
        }
        return Sub.instance;
    }

    // draw() {
    //   this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h);
    // }

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

    public getW(): number {
        return this.w;
    }

    public getH(): number {
        return this.h;
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

    public getInitialLatPos():number{
        return this.initialLatPos
    }
    public getInitialVertPos():number{
        return this.initialVertPos
    }

    clear() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    draw() {
        const sprite = this.sprites[this.currentFrame];
        this.ctx.drawImage(
            this.spriteSheet,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            this.getX(),
            this.getY(),
            this.getW(),
            this.getH()
        );
    }

    updateSprite() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastFrameTime;

        if (elapsedTime > 1000 / 10) {
            const sprite = this.sprites[this.currentFrame];
            this.ctx.drawImage(
                this.spriteSheet,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            );
            this.currentFrame++;
            if (this.currentFrame >= this.sprites.length) {
                this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;
        }

        requestAnimationFrame(this.updateSprite);
    }
}

export default Sub;
