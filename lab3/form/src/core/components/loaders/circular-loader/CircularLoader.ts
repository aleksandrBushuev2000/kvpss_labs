import { AbstractComponent } from "../../AbstractComponent";

export class CircularLoader extends AbstractComponent {
    private LOADER_CLASS_NAME : string = "spinner-border";
    private LOADER_WRAPPER_CLASS_NAME : string = "loader__wrapper";
    private BACKGROUND_COLOR = "green";

    makeNode(): HTMLElement {
        const wrapper = document.createElement('div');
        const loader = document.createElement('div');
        wrapper.className = this.LOADER_WRAPPER_CLASS_NAME;
        loader.className = this.LOADER_CLASS_NAME;
        loader.style.color = this.BACKGROUND_COLOR;

        wrapper.append(loader);
        return wrapper;
    }
    removeNode(): void {
        this.renderedNode.remove();
    }
    
}