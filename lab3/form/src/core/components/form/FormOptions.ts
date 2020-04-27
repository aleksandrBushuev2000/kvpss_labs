import { InputPayload } from "../input/InputPayload";

export class FormOptions<T> {
    needValidate : boolean;
    allowClickIfInvalid : boolean;
    submitCallback : (data : Array<InputPayload>) => Promise<T>;
    successCallback : (data : T) => void;
    errorCallback : (err : Error) => void;
    submitButtonText : string;
}