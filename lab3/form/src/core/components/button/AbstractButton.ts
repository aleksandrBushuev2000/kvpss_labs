import { ButtonOptions } from "./ButtonOptions";
import { IRenderable } from "../IRenderable";
import { EventEmitter } from "../../events/EventEmitter";

export abstract class AbstractButton extends EventEmitter implements IRenderable {
    protected rendered : boolean;
    protected renderedNode : HTMLElement;
    protected options : ButtonOptions;

    constructor(options : ButtonOptions) {
        super();
        this.options = options;
    }

    abstract destroy() : void;
    abstract setDisabled() : void;
    abstract setEnabled() : void;

    abstract makeNode() : HTMLElement;

    render(parent : HTMLElement): void {
        this.renderedNode = this.makeNode();
        parent.append(this.renderedNode);
        this.rendered = true;
    }


}