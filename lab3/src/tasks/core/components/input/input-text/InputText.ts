/**
 * @class InputText
 * Текстовое поле. 
 */
import { AbstractInput } from "../AbstractInput";

import { InputValidationObject } from "../InputValidationObject";
import { InputTextOptions } from "./InputTextOptions";
import { InputTextState } from "./InputTextState";

import { InputPayload } from "../InputPayload";
import { CoreEvent } from "../../../events/CoreEvent";

import "./InputText.sass";

export class InputText extends AbstractInput {
    /* CONSTANTS */
    private BOOTSTRAP_INVALID_CLASS = "is-invalid";
    private BOOTSTRAP_VALID_CLASS = "is-valid";
    private BOOTSTRAP_FORM_CONTROL = "form-control";
    private BOOTSTRAP_INVALID_FEEDBACK = "invalid-feedback";

    private TEXT_INPUT_MAP_NAME = "text-input";
    private INVALID_FEEDBACK_MAP_NAME = "invalid-feedback";

    private DEFAULT_INVALID_MESSAGE = "Поле не может быть пустым";

    private INVALID_FEEDBACK_INVISIBLE = "invalid-feedback-invisible";
    private WRAPPER_CLASS_NAME = "form-input__wrapper";
    /* END CONSTANTS */

    private importantHtmlElements : Map<string, HTMLElement>;

    private options : InputTextOptions;

    private state : InputTextState;

    private isTextarea : boolean;

    constructor(options : InputTextOptions) {
        super();
        this.importantHtmlElements = new Map();
        this.options = options;
        this.state = new InputTextState();
        this.isTextarea = options.inputType == 'textarea';
    }

    public setDisabled() {
        if (this.isRendered)
            (<HTMLInputElement>this.importantHtmlElements.get(this.TEXT_INPUT_MAP_NAME)).disabled = true;
    }

    public setEnabled() {
        if (this.isRendered) {
            (<HTMLInputElement>this.importantHtmlElements.get(this.TEXT_INPUT_MAP_NAME)).disabled = false;
        }
    }

    public getPayload() {
        return new InputPayload(this.state.input, this.options.inputName);
    }

    public getState() {
        return Object.assign(this.state, {});
    }

    public setState(state : InputTextState) {
        this.state.input = state.input;
        this.state.focused = state.focused;
        this.state.hasFirstFocus = state.hasFirstFocus;

        let input = <HTMLInputElement>this.importantHtmlElements.get(this.TEXT_INPUT_MAP_NAME);
        input.value = this.state.input;
        this.validateAndSetClasses();
    }

    public validateAndSetClasses() : boolean {
        if (this.options.needValidate) {
            let textInput = this.importantHtmlElements.get(this.TEXT_INPUT_MAP_NAME);
            let invalidFeedback = this.importantHtmlElements.get(this.INVALID_FEEDBACK_MAP_NAME);
            let validationResult = this.validate();
            let isValid = validationResult.getValidState();

            if (isValid) {
                textInput.classList.remove(this.BOOTSTRAP_INVALID_CLASS);
                textInput.classList.add(this.BOOTSTRAP_VALID_CLASS);
                invalidFeedback.classList.add(this.INVALID_FEEDBACK_INVISIBLE);
            } else {
                textInput.classList.remove(this.BOOTSTRAP_VALID_CLASS);
                textInput.classList.add(this.BOOTSTRAP_INVALID_CLASS);
                invalidFeedback.innerText = validationResult.getInvalidReason();
                invalidFeedback.classList.remove(this.INVALID_FEEDBACK_INVISIBLE);
            }

            return isValid;
        } 
        return true; 
    }

    private isSpacesMultiply() {
        const lastIndex = this.state.input.length - 1;
        const input = this.state.input;
        return input.length > 1 && input[lastIndex] == input[lastIndex - 1] && input[lastIndex] == " ";
    }

    private makeLabel() : HTMLLabelElement {
        const label = document.createElement("label");
        label.htmlFor = this.options.inputName || this.TEXT_INPUT_MAP_NAME;
        label.innerText = this.options.labelText || "";
        return label;
    }

    private makeTextInput() : HTMLInputElement | HTMLTextAreaElement {
        let textInput : HTMLInputElement | HTMLTextAreaElement;
        if (this.isTextarea) {
            textInput = document.createElement("textarea");
        } else {
            textInput = document.createElement("input");
            textInput.type = this.options.inputType;
        }
        textInput.className = this.BOOTSTRAP_FORM_CONTROL;
        textInput.name = this.options.inputName || this.TEXT_INPUT_MAP_NAME;
        textInput.placeholder = this.options.placeholder || "";
        return textInput;
    }

    private makeFeedback() : HTMLDivElement {
        const invalidFeedback = document.createElement('div');
        invalidFeedback.classList.add(this.BOOTSTRAP_INVALID_FEEDBACK, this.INVALID_FEEDBACK_INVISIBLE);
        return invalidFeedback;
    }

    private createEvent(name : string) : CoreEvent {
        let event = new CoreEvent();
        event.data = this.getState();
        event.name = name;
        event.target = this;
        return event;
    }

    makeNode() : HTMLElement {
        const divWrapper = document.createElement("div");
        if (this.options.inputId) {
            divWrapper.id = this.options.inputId;
        }

        const label = this.makeLabel();
        const textInput = this.makeTextInput();
        const invalidFeedback = this.makeFeedback();

        divWrapper.append(label, textInput, invalidFeedback);
        divWrapper.className = this.WRAPPER_CLASS_NAME;

        this.importantHtmlElements.set(this.TEXT_INPUT_MAP_NAME, textInput);
        this.importantHtmlElements.set(this.INVALID_FEEDBACK_MAP_NAME, <HTMLElement>invalidFeedback);

        textInput.oninput = () => {
            this.state.input = textInput.value;
            if (!this.options.allowMultipleSpaces && this.isSpacesMultiply()) {
                textInput.value = textInput.value.substring(0, textInput.value.length - 1);
                this.state.input = textInput.value;
            } 
            this.validateAndSetClasses();
            this.emitEvent(
                this.createEvent("input")
            );
        }

        textInput.onfocus = () => {
            this.state.focused = true;
            this.state.hasFirstFocus = true;
            const focusEvent = new CoreEvent();
            this.emitEvent(
                this.createEvent("focus")
            );
        }

        textInput.onblur = () => {
            this.state.focused = false;
            if (this.state.hasFirstFocus) {
                this.validateAndSetClasses();
            }
            this.emitEvent(
                this.createEvent("blur")
            );
        }

        return <HTMLElement>divWrapper;
    }

    validate() : InputValidationObject {
        if (this.options.needValidate) {
            let input = this.state.input;
            let validateFunction = this.options.validateFunction;
            if (!validateFunction) {
                validateFunction = (data) => {
                    return data.length > 0 
                        ? new InputValidationObject(true, "")
                        : new InputValidationObject(false, this.DEFAULT_INVALID_MESSAGE);
                }
            }
            return validateFunction(input);
        }
       
        return new InputValidationObject(true, "");
    }

    removeNode() {
        const textInput = this.importantHtmlElements.get(this.TEXT_INPUT_MAP_NAME);
        textInput.oninput = null;
        textInput.onfocus = null;
        textInput.onblur = null;
        this.renderedNode.remove();
    }
}