import { LAT_VELOCITY, VERTICAL_VELOCITY} from "./constants";


class InitialValues {

    private static instance: InitialValues;
    public width: number;
    public height: number;
    private FULL_LAT_LIMIT: number;
    private FULL_VERTICAL_LIMIT: number;
    private SUB_INITIAL_LAT_POS: number;
    private INITIAL_Y_POSITION: number;



        // if instance exists, return it
        private constructor() {
            this.width = window.innerWidth * 2;
            this.height = window.innerHeight * 2.05;
            this.FULL_LAT_LIMIT = this.getFullLatLimit();
            this.FULL_VERTICAL_LIMIT = this.getFullVertLimit();
            this. SUB_INITIAL_LAT_POS = this.getInitial_X()
            this.INITIAL_Y_POSITION = this.getInitial_Y();


            window.addEventListener('resize', this.updateWindowSize.bind(this));
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

        getWidth(){
            return this.width;
        }
        getHeight(){
            return this.height;
        }


        getFullLatLimit(){
            return this.roundDownToNearestVertVel(this.height * -0.7);
        }
        getFullVertLimit() {
            return this.roundDownToNearestVertVel(this.height * -0.95);
        }
    
        getInitial_X() {
            return this.roundDownToNearestLatVel(this.width * 0.2604);
        }
        getInitial_Y() {
            return this.roundDownToNearestVertVel(this.height * 0.0259);
        }

        roundDownToNearestLatVel(num: number) {
            return Math.floor(num /LAT_VELOCITY) * LAT_VELOCITY;
        }
    
        roundDownToNearestVertVel(num: number) {
            return Math.floor(num / VERTICAL_VELOCITY) * VERTICAL_VELOCITY;
        }

}

export default InitialValues;