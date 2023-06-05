



class InitialValues {

    private static instance: InitialValues;
    public windowWidth: number;
    public windowHeight: number;

        // if instance exists, return it
        private constructor() {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            window.addEventListener('resize', this.updateWindowSize.bind(this));
        }

        public static getInstance(): InitialValues {
            if (!InitialValues.instance) {
                InitialValues.instance = new InitialValues();
            }
            return InitialValues.instance;
        }
        private updateWindowSize(): void {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        }
  

}

export default InitialValues;