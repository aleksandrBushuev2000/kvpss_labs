import { FormSubmitCallback } from "./FormSubmitCallback";

export class FormOptions {
    needValidate : boolean;
    allowClickIfInvalid : boolean;
    submitCallback : FormSubmitCallback;
    submitButtonText : string;
}