import { AbstractComponent } from "../AbstractComponent";
import { SnackbarOptions } from "./SnackbarOptions";

import './Snackbar.sass';

export class Snackbar extends AbstractComponent {
    private SNACKBAR_WRAPPER_CLASS_NAME = "snackbar__wrapper";
    private SNACKBAR_BOOTSTRAP_CLASSNAME = "alert";
    private SNACKBAR_BEFORE_DESTROY_CLASS_TOP = "snackbar__wrapper_before-destroy-top";
    private SNACKBAR_BEFORE_DESTROY_CLASS_BOTTOM = "snackbar__wrapper_before-destroy-bottom";
    private BOTTOM_SNACKBAR_CLASS = "snackbar__wrapper_bottom";

    private options : SnackbarOptions;

    private defaults = {
        color : "green",
        textColor : "white",
        bottom : false,
        lifetime : 1500
    }

    constructor(options : SnackbarOptions) {
        super();
        this.options = options;
    }

    makeNode(): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.className = this.SNACKBAR_WRAPPER_CLASS_NAME;
        const snackbar = document.createElement('div');
        snackbar.className = this.SNACKBAR_BOOTSTRAP_CLASSNAME;
        snackbar.innerText = this.options.message;
        snackbar.style.backgroundColor = this.options.color || this.defaults.color;
        snackbar.style.color = this.options.textColor || this.defaults.textColor;
        wrapper.appendChild(snackbar);

        if (this.options.bottom) {
            wrapper.classList.add(this.BOTTOM_SNACKBAR_CLASS);
        }

        setTimeout(() => {
            this.removeNode();
        }, this.options.lifetime || this.defaults.lifetime)

        return wrapper;
    }

    async playCloseAnimation() {
        return new Promise((resolve, reject) => {
            let snackbarDestroyClassName = this.options.bottom
                ? this.SNACKBAR_BEFORE_DESTROY_CLASS_BOTTOM
                : this.SNACKBAR_BEFORE_DESTROY_CLASS_TOP;
            this.renderedNode.classList.add(snackbarDestroyClassName);
            this.renderedNode.ontransitionend = (ev) => {
                resolve();
            }
        })
    }

    removeNode(): void {
        this.playCloseAnimation()
        .finally(() => {
            this.renderedNode.ontransitionend = null;
            this.renderedNode.remove();
        })
    }   
}