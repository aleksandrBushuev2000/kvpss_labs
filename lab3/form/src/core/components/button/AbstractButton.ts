import { ButtonOptions } from "./ButtonOptions";
import { IRenderable } from "../IRenderable";
import { EventEmitter } from "../../events/EventEmitter";
import { AbstractEmitterComponent } from "../AbstractEmitterComponent";

export abstract class AbstractButton extends AbstractEmitterComponent {
    protected rendered : boolean;
    protected renderedNode : HTMLElement;
    protected options : ButtonOptions;

    constructor(options : ButtonOptions) {
        super();
        this.options = options;
    }

    abstract setDisabled() : void;
    abstract setEnabled() : void;

    abstract makeNode() : HTMLElement;
}