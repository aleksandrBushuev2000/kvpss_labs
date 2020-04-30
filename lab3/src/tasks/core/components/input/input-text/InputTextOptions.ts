import { IInputValidateFunction } from "../IInputValidateFunction";

export class InputTextOptions {
    public labelText : string;
    public inputName : string;
    public inputId : string;
    public inputType : string;
    public needValidate : boolean;
    public validateFunction : IInputValidateFunction;
    public placeholder : string;
    public allowMultipleSpaces : boolean;
};