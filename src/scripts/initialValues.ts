import { LAT_VELOCITY, VERTICAL_VELOCITY } from "./constants";

class InitialValues {
    private static instance: InitialValues;
    public width: number; 
    public height: number;

    private constructor() {
        this.width = window.innerWidth * 2;
        this.height = window.innerHeight * 2.05;
        window.addEventListener("resize", this.updateWindowSize.bind(this));
    }

    public static getInstance(): InitialValues {
        if (!InitialValues.instance) {
            InitialValues.instance = new InitialValues();
        }
        return InitialValues.instance;
    }
    private updateWindowSize(): void {
        this.width = window.innerWidth * 2;
        this.height = window.innerHeight * 2.05;
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

    getInitial_X() {
        return this.roundDownToNearestVertVel(this.width * 0.2604);
    }
    getInitial_Y() {
        return this.roundDownToNearestVertVel(this.height * 0.06);
    }

    getFullLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.6375);
    }
    getFullVertLimit() {
        return this.roundDownToNearestVertVel(this.height * -0.95);
    }

    getOceanLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.45);
    }

    getOceanVertLimit() {
        return this.roundDownToNearestVertVel(this.height * -0.55);
    }

    roundDownToNearestLatVel(num: number) {
        return Math.floor(num / LAT_VELOCITY) * LAT_VELOCITY;
    }

    roundDownToNearestVertVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }
}

export default InitialValues;
