import { textObjects } from "./constants";
import CalcConstant from "./calcConstant";
import Zone from "./zone";
import { ITextObject } from "./types";

class EdText {
    private cssOne = [
        "upperPelagic",
        "upper",
        "middle",
        "middle",
        "lower",
        "lower",
    ];
    private edContainer: HTMLElement;
    private edTitle: HTMLElement;
    private edText: HTMLElement;
    private textEls: HTMLElement[];
    private instPanel: HTMLElement;
    private textElStrings: string[];
    private textElSuffixes: string[];
    private textElTypes: string[];
    private zoneFlag: string;
    private textObjects: ITextObject[];
    private calcConstants: CalcConstant;
    private zone: Zone;

    constructor() {
        this.edContainer = document.getElementById("edContainer") || null;
        this.edTitle = document.getElementById("edTitle") || null;
        this.edText = document.getElementById("edText") || null;
        this.textEls = [this.edContainer, this.edTitle, this.edText];
        this.textElStrings = ["edContainer", "edTitle", "edText"];
        this.textElSuffixes = ["EdContainer", "EdTitle", "EdText"];
        this.textElTypes = ["id", "title", "text"];
        this.textObjects = textObjects;
        this.instPanel = document.getElementById("instPanelContainer");
        this.calcConstants = new CalcConstant();
        this.zone = new Zone();
    }

    updateEdText(canvasNum: number) {
        this.setEdStyle(canvasNum);
        this.setEdText();
    }

    private setEdStyle(canvasNum: number) {
        let num: number = this.zone.getZoneObjectNumber();
        this.clearAllEdElementsClassList();
        if (this.textEls.length < 1) return;
        if (canvasNum === 1) {
            this.textEls.forEach((textEl, idx) => {
                let className = this.textElStrings[idx];
                let className2 =
                    this.cssOne[num] + "Style" + this.textElSuffixes[idx];
                if (textEl) textEl.classList.add(className);
                if (textEl) textEl.classList.add(className2);
            });
            this.instPanel.classList.add("hide");
        } else if (canvasNum === 2) {
            this.instPanel.classList.add("hide");
            this.edContainer.classList.add("hide");
        } else if (canvasNum === 3) {
            this.clearEdContainer();
            this.edContainer.classList.add("cockpitStyleEdContainer");
            this.edTitle.classList.add("edTitle");
            this.edTitle.classList.add("cockpitStyleEdTitle");
            this.edText.classList.add("edText");
            this.edText.classList.add("cockpitStyleEdText");
            this.instPanel.classList.remove("hide");
        }
    }

    initialEdSetup() {
        this.updateEdText(1);
    }

    private setEdText() {
        let textObject = this.zone.upDateZoneObject();
        if (this.edTitle) this.edTitle.textContent = textObject.title;
        if (this.edText) this.edText.textContent = textObject.text;
    }

    clearEdContainer() {
        this.edContainer.classList.forEach((className) => {
            this.edContainer.classList.remove(className);
        });
    }

    clearOneEdElementClassList(element: HTMLElement) {
        if (!element) return;
        while (element.classList.length > 0) {
            element.classList.remove(element.classList.item(0));
        }
    }

    clearAllEdElementsClassList() {
        this.textEls.forEach((textEl) => {
            this.clearOneEdElementClassList(textEl);
        });
    }
}

export default EdText;
