import { Form } from "../core/components/form/Form";
import { FormOptions } from "../core/components/form/FormOptions";
import { InputTextOptions } from "../core/components/input/input-text/InputTextOptions";
import { InputValidationObject } from "../core/components/input/InputValidationObject";
import { InputText } from "../core/components/input/input-text/InputText";

export class FormBuilder {
    private formInstance : Form;

    constructor(formOptions : FormOptions) {
        this.formInstance = new Form(formOptions);
    }

    public buildNameInput() : void {
        const nameOptions = new InputTextOptions();
        nameOptions.inputType = "text";
        nameOptions.allowMultipleSpaces = false;
        nameOptions.inputName = "input-name";
        nameOptions.labelText = "Ваше имя";
        nameOptions.placeholder = "Ваше имя (5 - 15 символов)";
        nameOptions.needValidate = true;
        nameOptions.validateFunction = (data) => {
            let invalidRegex = /[^a-zA-zА-Яа-яыё\s]/;
            let length = data.split(" ").join("").length;
            if (length == 0) {
                return new InputValidationObject(false, "Поле не может быть пустым");
            } else if (length < 5) {
                return new InputValidationObject(false, "Поле должно содержать более 5 символов");
            } else if (length > 15) {
                return new InputValidationObject(false, "Поле должно содержать менее 15 символов");
            } else if (invalidRegex.test(data)){
                return new InputValidationObject(false, "Поле должно содержать только буквы русского или латинского алфавита");
            } else {
                return new InputValidationObject(true, "");
            }
        }

        const text = new InputText(nameOptions);
        this.formInstance.push(text);
    }

    public buildEmailInput() {
        const emailOptions = new InputTextOptions();
        emailOptions.allowMultipleSpaces = false;
        emailOptions.inputType = "email";
        emailOptions.inputName = "input-email";
        emailOptions.labelText = "Ваш email";
        emailOptions.placeholder = "Email - address";
        emailOptions.needValidate = true;
        emailOptions.validateFunction = (data) => {
            let invalidRegex = /[^a-zA-z@.]/;
            let length = data.length;
            if (length == 0) {
                return new InputValidationObject(false, "Поле не может быть пустым");
            } else if (invalidRegex.test(data)){
                return new InputValidationObject(false, "Поле должно содержать только буквы латинского алфавита");
            } else if (data.indexOf("@") != data.lastIndexOf("@") 
                || data.indexOf("@") < 1 
                    || data.lastIndexOf("@") > data.length - 3 ) {
                return new InputValidationObject(false, "Некорректный email");
            }
            return new InputValidationObject(true, "");
        }

        const email = new InputText(emailOptions);
        this.formInstance.push(email);
    }

    public buildUserMessage() {
        const userMessageOptions = new InputTextOptions();
        userMessageOptions.allowMultipleSpaces = true;
        userMessageOptions.inputType = "textarea";
        userMessageOptions.inputName = "input-message";
        userMessageOptions.labelText = "Ваше сообщение";
        userMessageOptions.placeholder = "Ваше сообщение (150 - 1000 символов)";
        userMessageOptions.needValidate = true;
        userMessageOptions.validateFunction = (data) => {
            let invalidRegex = /[^a-zA-zА-Яа-яыё\s-]/;
            let length = data.split(" ").join("").length;
            if (length == 0) {
                return new InputValidationObject(false, "Поле не может быть пустым");
            } else if (length < 150) {
                return new InputValidationObject(false, "Поле должно содержать более 150 символов");
            } else if (length > 1000) {
                return new InputValidationObject(false, "Поле должно содержать менее 1000 символов");
            } else if (invalidRegex.test(data)){
                return new InputValidationObject(false, "Поле должно содержать только буквы русского или латинского алфавита и дефис");
            } else {
                return new InputValidationObject(true, "");
            }
        }

        const msg = new InputText(userMessageOptions);
        this.formInstance.push(msg);
    }

    public render(parent : HTMLElement) {
        this.formInstance.render(parent);
    }
}