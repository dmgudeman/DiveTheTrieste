class Modal {
    private modalId: string;
    private modal: HTMLElement | null;
    private closeButton: HTMLSpanElement | null;

    constructor(modalId: string, closeButtonClass?: string) {
        this.modalId = modalId;
        this.modal = document.getElementById(modalId);
        this.closeButton = document.getElementsByClassName(
            closeButtonClass
        )[0] as HTMLSpanElement | null;

        if (this.closeButton) {
            this.closeButton.addEventListener("click", () => {
             this.hideModal();
            });
        }

        if (this.modal) {
            window.addEventListener("click", (event) => {
                if (event.target === this.modal) {
                    this.hideModal()
                }
            });
        }
        if (this.modalId = "modal") {
            localStorage.setItem("modal", "false")
        }
    }

    displayModalInitially() {
        if (!(localStorage.getItem(this.modal?.id) === "true")) {
            this.showModal();
        }
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = "block";
        }
    }

    hideModal() {
        if(this.modal) {
            this.modal.style.display = "none";
        }
        localStorage.setItem(this.modal?.id || "modalDisplayed", 'true');
    }
    public getModalElement(): HTMLElement | null {
        return this.modal;
    }
}

export default Modal;
