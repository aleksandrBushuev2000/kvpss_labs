import { InputValidationObject } from "./input/InputValidationObject";

export interface IValidable {
    validate() : InputValidationObject;
}