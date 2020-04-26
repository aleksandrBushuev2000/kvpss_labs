import { InputPayload } from "../input/InputPayload";

export interface FormSubmitCallback {
    (payload : Array<InputPayload>) : void;
}