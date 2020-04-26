import { IRenderable } from '../IRenderable';
import { IValidable } from '../IValidable';
import { InputValidationObject } from './InputValidationObject';
import { RenderException } from '../../exceptions/RenderException';
import { InputPayload } from './InputPayload';
import { EventEmitter } from '../../events/EventEmitter';

const RERENDER_MESSAGE = "This component has been already rendered";

export abstract class AbstractInput extends EventEmitter implements IRenderable, IValidable {
    protected renderedNode : HTMLElement;

    protected rendered : boolean;

    protected makeNode() : HTMLElement {
        return null;
    };

    abstract validateAndSetClasses() : boolean;
    abstract validate() : InputValidationObject;

    isRendered() {
        return this.rendered;
    }

    render(parent : HTMLElement) {
        if (!this.rendered) {
            this.renderedNode = this.makeNode();
            parent.append(this.renderedNode);
            this.rendered = true;
        } else {
            throw new RenderException(RERENDER_MESSAGE);
        }
    }

    abstract getPayload() : InputPayload;
    abstract destroy() : void;
}
