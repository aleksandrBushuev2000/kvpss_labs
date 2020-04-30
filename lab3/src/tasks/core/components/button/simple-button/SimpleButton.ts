import { AbstractButton } from "../AbstractButton";
import { ButtonOptions } from "../ButtonOptions";
import { SimpleButtonState } from "./SimpleButtonState";
import { CoreEvent } from "../../../events/CoreEvent";

import './SimpleButton.sass'

export class SimpleButton extends AbstractButton {
    private WRAPPER_CLASS_NAME = 'button-wrapper';
    private BUTTON_CLASS_NAME = "btn btn-success";

    private state : SimpleButtonState;
    private button : HTMLButtonElement;

    constructor(options: ButtonOptions) {
        super(options);
        this.state = new SimpleButtonState();
        this.state.disabled = false;
    }

    removeNode() {
        this.button.onclick = null; 
        this.renderedNode.remove();
    }
    
    setDisabled() {
        this.state.disabled = true;
        this.button.disabled = this.state.disabled;
    }

    setEnabled() {
        this.state.disabled = false;
        this.button.disabled = this.state.disabled;
    }

    makeNode(): HTMLElement {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add(this.WRAPPER_CLASS_NAME);
        const button = document.createElement('button');
        button.className = this.BUTTON_CLASS_NAME;
        button.innerText = this.options.buttonText;
        buttonWrapper.append(button);
        button.onclick = (e) => {
            e.preventDefault();
            const ev = new CoreEvent();
            ev.name = "click";
            ev.data = null;
            ev.target = this;
            this.emitEvent(ev);
        };

        this.button = button;

        return buttonWrapper;
    }
    
}