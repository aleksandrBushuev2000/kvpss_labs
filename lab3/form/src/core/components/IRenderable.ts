export interface IRenderable {
    render(parent : HTMLElement) : void;
    destroy() : void;
}