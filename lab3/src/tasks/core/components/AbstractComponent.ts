import { IRenderable } from "./IRenderable";

export abstract class AbstractComponent implements IRenderable {
    protected renderedNode : HTMLElement;
    protected isRendered : boolean;

    abstract makeNode() : HTMLElement;
    abstract removeNode() : void;

    public addClass(className : string) : boolean {
        if (this.isRendered) {
            this.renderedNode.classList.add(className);
            return true;
        }
        return false;
    }

    public removeClass(className : string) : boolean {
        if (this.isRendered) {
            this.renderedNode.classList.remove(className);
            return true;
        }
        return false;
    }

    public getRenderState() : boolean {
        return this.isRendered;
    }

    render(parent: HTMLElement) : void {
        const node = this.makeNode();
        parent.append(node);
        this.renderedNode = node;
        this.isRendered = true;
    }

    destroy() : void {
        this.isRendered = false;
        this.removeNode();
    }
    
}