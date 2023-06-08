import Move from "./move";
import { getCurrentCanvas } from "./constants";
import { showCanvas1, showCanvas2, showCanvas3 } from "./util";
import Ocean from "./ocean";
import Sub from "./sub";
import Zone from "./zone";
import Images from "./images";
import Cockpit from "./cockpit";
import Modal from "./modal";
import { showZone, showDepth, showLat, showGeoDisplay } from "./boundary";

class Keymaster {
    private ocean: Ocean;
    private sub: Sub;
    // private images: Images;
    // private cockpit: Cockpit
    // private dir: string;
    private modal: Modal;
    private cockpitModal: Modal;
    private move: Move;

    constructor() {
        this.ocean = Ocean.getInstance();
        this.sub = Sub.getInstance();
        this.modal = new Modal("modal", "close");
        this.cockpitModal = new Modal("cockpitModal")
        this.move = new Move(this.ocean, this.sub);
    }
    // set key funciton depending on which canvas is showing
    keyDown(
        e: KeyboardEvent,
        ctx1: CanvasRenderingContext2D,
        ctx2: CanvasRenderingContext2D,
        ctx3: CanvasRenderingContext2D
    ) {
        let currentCanvas: number = getCurrentCanvas();
        if (currentCanvas === 1) {
            if (e.key === "ArrowDown" || e.key === "Down") {
                this.newPos("down");
            } else if (e.key === "ArrowLeft" || e.key === "Left") {
                this.newPos("left");
            } else if (e.key === "ArrowRight" || e.key === "Right") {
                this.newPos("right");
            } else if (e.key === "ArrowUp" || e.key === "Up") {
                this.newPos("up");
            } else if (e.key === "Enter") {
                this.navigate("Enter");
            } else if (e.key === "Escape") {
                this.navigate("Escape");
            }
        } else if (currentCanvas === 2) {
            if (e.key === "Enter") {
                showCanvas1();
            }
        } else if (currentCanvas === 3) {
            let cockpit = new Cockpit(ctx3);
            if (e.key === "ArrowDown" || e.key === "Down") {
                cockpit.draw();
                this.newPos("down");
            } else if (e.key === "ArrowLeft" || e.key === "Left") {
                cockpit.draw();
                this.newPos("left");
            } else if (e.key === "ArrowRight" || e.key === "Right") {
                cockpit.draw();
                this.newPos("right");
            } else if (e.key === "ArrowUp" || e.key === "Up") {
                cockpit.draw();
                this.newPos("up");
            } else if (e.key === "Enter") {
                this.navigate("Enter");
            } else if (e.key === "Escape") {
                this.navigate("Escape");
            }
        }
    }

    navigate(navigate: string): void {
        let currentCanvas = getCurrentCanvas();
        console.log("CURRENT CANVAS", currentCanvas);
        console.log('NAVIGATE', navigate);
        console.log('localStorage', localStorage.modalDisplayed)

        if (navigate === "Enter") {
            if (currentCanvas === 1) {
                if (localStorage.getItem("modal") === "false") {
                    this.modal.hideModal();
                } else {
                    showCanvas3();
                }
            } else if (currentCanvas === 2) {
                showCanvas1();
            } else if (currentCanvas === 3) {
                showCanvas1();
            }
        } else if (navigate === "Escape") {
            switch (currentCanvas) {
                case 1:
                    showCanvas2();
                    break;
                case 2:
                    showCanvas1();
                    break;
                case 3:
                    showCanvas2();
                    break;
                default:
                    break;
            }
        }
    }

    newPos(dir: string): void {
        const zone = new Zone();
        showLat();
        showDepth();
        showGeoDisplay();
        zone.upDateZoneObject();
        this.move.getMove(dir);
        if (dir === "left" || dir === "right") this.sub.setLastLatDir(dir);
    }

    // closeModal = ():void => {
    //     window.addEventListener("click", (event) => {
    //         if (event.target === this.modal) {
    //             this.modal.style.display = "none";
    //             localStorage.setItem("modalDisplayed", "true");
    //         }
    //     });
    // };

    // addModalEventListener(navigate: string):void {
    //     this.modal.style.display = "block";
    //     localStorage.setItem("modalDisplayed", "true");
    //     this.modal.addEventListener("click", () => {
    //         this.navigate(navigate);
    //         this.modal.style.display = "none";
    //     });
    // }

    //   let keyRepeatTimeout;
    // let keyRepeatInterval;
    // let keyHeldDown = false;

    // document.addEventListener('keydown', function(event) {
    //   if (event.key === 'Enter') {
    //     if (!keyHeldDown) {
    //       keyHeldDown = true;
    //       console.log('Key is being held down');

    //       // Perform initial action when the key is first pressed

    //       // Start the timer for repeated actions
    //       keyRepeatTimeout = setTimeout(startKeyRepeat, 500);
    //     }
    //   }
    // });

    // document.addEventListener('keyup', function(event) {
    //   if (event.key === 'Enter') {
    //     keyHeldDown = false;
    //     console.log('Key is released');

    //     // Stop the timer for repeated actions
    //     clearTimeout(keyRepeatTimeout);
    //     clearInterval(keyRepeatInterval);
    //   }
    // });

    // function startKeyRepeat() {
    //   // Perform repeated actions when the key is held down
    //   console.log('Key is repeatedly pressed');

    //   // Set the interval for repeated actions
    //   keyRepeatInterval = setInterval(function() {
    //     // Perform repeated actions here
    //     console.log('Key is repeatedly pressed');
    //   }, 200);
    // }
}

export default Keymaster;
