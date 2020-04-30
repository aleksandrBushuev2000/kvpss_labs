import { IRenderable } from '../IRenderable';
import { IValidable } from '../IValidable';
import { InputValidationObject } from './InputValidationObject';
import { RenderException } from '../../exceptions/RenderException';
import { InputPayload } from './InputPayload';
import { AbstractEmitterComponent } from '../AbstractEmitterComponent';

export abstract class AbstractInput extends AbstractEmitterComponent implements IValidable {
    abstract validateAndSetClasses() : boolean;
    abstract validate() : InputValidationObject;

    abstract setDisabled() : void;
    abstract setEnabled() : void;

    abstract getPayload() : InputPayload;
}
