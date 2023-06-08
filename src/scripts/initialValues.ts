import { LAT_VELOCITY, VERTICAL_VELOCITY } from "./constants";

class InitialValues {
    private static instance: InitialValues;
    public width: number;// OBJECT option values
    public height: number;
    // private FULL_LAT_LIMIT: number;
    // private FULL_VERTICAL_LIMIT: number;
    // private OCEAN_LAT_LIMIT: number;
    // private OCEAN_VERTICAL_LIMIT: number;
    // private SUB_INITIAL_LAT_POS: number;
    // private INITIAL_Y_POSITION: number;

    private constructor() {
        this.width = window.innerWidth * 2;
        this.height = window.innerHeight * 2.05;
        // this.FULL_LAT_LIMIT = this.getFullLatLimit();
        // this.FULL_VERTICAL_LIMIT = this.getFullVertLimit();
        // this.OCEAN_LAT_LIMIT = this.getOceanLatLimit();
        // this.OCEAN_VERTICAL_LIMIT = this.getOceanVertLimit();
        // this.INITIAL_Y_POSITION = this.getInitial_Y();

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
        return this.width * 0.2604;
    }
    getInitial_Y() {
        return this.roundDownToNearestVertVel(this.height * 0.04028);
    }

    getFullLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.6375);
    }
    getFullVertLimit() {
        // return this.roundDownToNearestVertVel(this.height * -0.95);
        return this.height * -0.95;
    }

    getOceanLatLimit() {
        return this.roundDownToNearestLatVel(this.width * -0.45);
    }
   
    getOceanVertLimit() {
        // return this.roundDownToNearestVertVel(this.height * -0.55);
        return this.height *-0.55
    }

    roundDownToNearestLatVel(num: number) {
        return Math.floor(num / LAT_VELOCITY) * LAT_VELOCITY;
    }

    roundDownToNearestVertVel(num: number) {
        return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
    }
}

export default InitialValues;
