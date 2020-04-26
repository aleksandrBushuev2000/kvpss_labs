import { IRenderable } from "../IRenderable";
import { AbstractInput } from "../input/AbstractInput";
import { FormOptions } from "./FormOptions";
import { AbstractButton } from "../button/AbstractButton";
import { EventHandler } from "../../events/EventHandler";
import { CoreEvent } from '../../events/CoreEvent';
import { SimpleButton } from "../button/simple-button/SimpleButton";

import './Form.sass';

export class Form implements IRenderable, EventHandler {
    private FORM_GROUP_BOOTSTRAP_CLASS = "form-group";
    private SUBMIT_BUTTON_TEXT = "Отправить";
    private SUBMIT_BUTTON_WRAPPER_CLASS = "submit-button__wrapper";


    private formInputs : Array<AbstractInput>;
    private submitInput : AbstractButton;
    private options : FormOptions;

    private rendered : boolean;

    private renderedNode : HTMLFormElement;
    private inputsWrapper : HTMLDivElement;

    constructor(options : FormOptions) {
        this.formInputs = [];
        this.options = options;
        this.submitInput = new SimpleButton({
            buttonText : this.options.submitButtonText 
                || this.SUBMIT_BUTTON_TEXT
        });
        this.submitInput.pushSubscriber(this);
    }

    handleEvent(event: CoreEvent): void {
        if (event.name == "input" 
            && event.target != this.submitInput
                && !this.options.allowClickIfInvalid        
        ) {
            if (this.checkNeedEnableButton()) {
                this.submitInput.setEnabled();
            } else {
                this.submitInput.setDisabled();
            }
        } else if (event.name == "click" && event.target == this.submitInput) {
            this.submit();
            console.log(event)
        }
    }

    private checkNeedEnableButton() {
        if (this.options.needValidate && !this.options.allowClickIfInvalid) {
            return this.formInputs.reduce((prev, next) => {
                let stateNext = next.validate().getValidState();
                return prev === true 
                    ? stateNext
                    : false;
            }, true)
        }
        return true;
    }

    push(input : AbstractInput) {
        this.formInputs.push(input);
        input.pushSubscriber(this);
        if (this.rendered) {
            input.render(this.inputsWrapper);
        }    
    }

    pop() {
        if (this.formInputs.length > 0) {
            let input = this.formInputs[this.formInputs.length - 1];
            input.destroy();
        }
    }

    render(parent : HTMLElement): void {
        const wrapper = document.createElement('form');
        wrapper.autocapitalize = "off";
        wrapper.autocomplete = "off";
        wrapper.spellcheck = false;

        const inputsWrapper = document.createElement('div');
        inputsWrapper.classList.add(this.FORM_GROUP_BOOTSTRAP_CLASS);

        this.formInputs.forEach(el => el.render(inputsWrapper));

        this.rendered = true;
        wrapper.append(inputsWrapper);
        parent.append(wrapper);

        const buttonWraper = document.createElement('div');
        buttonWraper.classList.add(this.SUBMIT_BUTTON_WRAPPER_CLASS);
        
        this.submitInput.render(buttonWraper);
        wrapper.append(buttonWraper);

        this.inputsWrapper = inputsWrapper;
        this.renderedNode = wrapper;

        if (!this.options.allowClickIfInvalid && !this.checkNeedEnableButton()) {
            this.submitInput.setDisabled();
            
        }
    }

    destroy(): void {
        if (this.rendered) {
            this.formInputs.map(el => el.destroy());
            this.submitInput.destroy();
            this.renderedNode.remove();
        }
    }

    validate() : boolean {
        return this.formInputs.reduce((prev, next) => {
            let stateNext = next.validateAndSetClasses();
            return prev === true 
                ? stateNext
                : false;
        }, true)
    }

    submit() {
        if (this.options.needValidate) {
            let validationResult = this.validate();
            if (validationResult) {
                this.options.submitCallback(
                    this.formInputs.map(el => el.getPayload())
                );
            }
        } else {
            this.options.submitCallback(
                this.formInputs.map(el => el.getPayload())
            );
        }
    }
    
}