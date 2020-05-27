/** 
 *  Base class for program that do the rendering of a drawing on a layer.
 */
class Renderer {
    layer: Layer;

    attachLayer(layer: Layer): void {
        this.layer = layer;
        this.init();
    }

    init(): void {
        throw new Error("Method not implemented.");
    }

    draw(): void {
        throw new Error("Method not implemented.");
    }

}