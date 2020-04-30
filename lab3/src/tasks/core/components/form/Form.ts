import { AbstractComponent } from "../AbstractComponent";
import { AbstractInput } from "../input/AbstractInput";
import { FormOptions } from "./FormOptions";
import { AbstractButton } from "../button/AbstractButton";
import { EventHandler } from "../../events/EventHandler";
import { CoreEvent } from '../../events/CoreEvent';
import { SimpleButton } from "../button/simple-button/SimpleButton";

import './Form.sass';
import { CircularLoader } from "../loaders/circular-loader/CircularLoader";


export class Form<T> extends AbstractComponent implements EventHandler {
    private FORM_GROUP_BOOTSTRAP_CLASS = "form-group";
    private SUBMIT_BUTTON_TEXT = "Отправить";
    private SUBMIT_BUTTON_WRAPPER_CLASS = "submit-button__wrapper";
    private INVISIBLE_CLASS = "form__component_invisible";

    private FORM_SUBMIT_CLASS = "form__submit__wrapper";

    private formInputs : Array<AbstractInput>;
    private submitInput : AbstractButton;
    private pendingLoader : CircularLoader;
    private options : FormOptions<T>;
    private inputsWrapper : HTMLDivElement;

    private defaults = {
        successCallback : (data : T) => {
            console.log(data);
        },
        errorCallback : (err : Error) => {
            console.error(err);
        }
    }

    constructor(options : FormOptions<T>) {
        super();
        this.formInputs = [];
        this.options = options;
        this.submitInput = new SimpleButton({
            buttonText : this.options.submitButtonText 
                || this.SUBMIT_BUTTON_TEXT
        });
        this.pendingLoader = new CircularLoader();
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

    private setNoPending() {
        this.formInputs.forEach(el => el.setEnabled());
        this.pendingLoader.addClass(this.INVISIBLE_CLASS);
        this.submitInput.removeClass(this.INVISIBLE_CLASS);
    }

    private setPending() {
        this.formInputs.forEach(el => el.setDisabled());
        this.pendingLoader.removeClass(this.INVISIBLE_CLASS);
        this.submitInput.addClass(this.INVISIBLE_CLASS);
    }

    push(input : AbstractInput) {
        this.formInputs.push(input);
        input.pushSubscriber(this);
        if (this.isRendered) {
            input.render(this.inputsWrapper);
        }    
    }

    pop() {
        if (this.formInputs.length > 0) {
            let input = this.formInputs[this.formInputs.length - 1];
            input.destroy();
        }
    }

    makeNode(): HTMLElement {
        const wrapper = document.createElement('form');
        wrapper.autocapitalize = "off";
        wrapper.autocomplete = "off";
        wrapper.spellcheck = false;

        const inputsWrapper = document.createElement('div');
        inputsWrapper.classList.add(this.FORM_GROUP_BOOTSTRAP_CLASS);

        this.formInputs.forEach(el => el.render(inputsWrapper));

        wrapper.append(inputsWrapper);

        const buttonWraper = document.createElement('div');
        buttonWraper.classList.add(this.SUBMIT_BUTTON_WRAPPER_CLASS);
        
        this.submitInput.render(buttonWraper);
        wrapper.append(buttonWraper);

        this.pendingLoader.render(wrapper);
        this.pendingLoader.addClass(this.FORM_SUBMIT_CLASS);
        this.submitInput.addClass(this.FORM_SUBMIT_CLASS);

        this.setNoPending();

        this.inputsWrapper = inputsWrapper;
        this.renderedNode = wrapper;


        if (!this.options.allowClickIfInvalid && !this.checkNeedEnableButton()) {
            this.submitInput.setDisabled();
        }

        return wrapper;
    }

    removeNode(): void {
        this.formInputs.map(el => el.destroy());
        this.submitInput.destroy();
        this.renderedNode.remove();
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
        const successCallback = this.options.successCallback || this.defaults.successCallback;
        const errorCallback = this.options.errorCallback || this.defaults.errorCallback;
        let validationResult = this.options.needValidate ? this.validate() : true;
        if (validationResult) {
            this.setPending();
            this.options.submitCallback(
                this.formInputs.map(el => el.getPayload())
            )
            .then(successCallback)
            .catch(errorCallback)
            .finally(() => this.setNoPending());
        }
    }
    
}