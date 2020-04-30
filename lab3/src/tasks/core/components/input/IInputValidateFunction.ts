import { InputValidationObject } from "./InputValidationObject";

export interface IInputValidateFunction {
    (data : string) : InputValidationObject;
}