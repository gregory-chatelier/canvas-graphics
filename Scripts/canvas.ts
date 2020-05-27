/** 
 *  A canvas is a collection of stacked layers.
 *  Rendering can be called in a loop to perform animations.
 */
class Canvas {
    container: HTMLElement;
    layers: Layer[] = [];
    private iterations: number;
    private intervalId: number;
    private handleKeyboardEscape: (e: KeyboardEvent) => void;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
    }

    addLayer(name: string = null, rendering: Rendering = Rendering.Paint,
                backgroundColor: string = "transparent"): Layer {
        let index: number = this.layers.length;
        let layer = new Layer(name, index, this.container.clientWidth,
            this.container.clientHeight, backgroundColor, rendering);
        this.layers.push(layer);
        return layer;
    }

    render(loopInterval: number = null, maxIterations: number = Number.POSITIVE_INFINITY): void {
        for (let i = 0; i < this.layers.length; i++) {
            this.container.appendChild(this.layers[i].canvas);
        }
        if (!loopInterval || loopInterval < 2) {
            this.renderFrame();
            return;
        }

        this.iterations = 0;
        var self: Canvas = this;

        this.handleKeyboardEscape = function (e: KeyboardEvent): void {
            if (e.key === "Escape") {
                self.interruptRendering();
            }
        }
        document.addEventListener("keyup", this.handleKeyboardEscape);

        this.intervalId = setInterval(function () {
            if (++self.iterations > maxIterations) {
                self.interruptRendering();
            }
            self.renderFrame();
        }, loopInterval);
    }

    renderFrame(): void {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].render();
        }
    }

    private interruptRendering(): void {
        try {
            clearInterval(this.intervalId);
            document.removeEventListener("keyup", this.handleKeyboardEscape);
            console.log('Rendering interrupted.');
        } catch (e) {
            console.error('No rendering to interrupt.');
        }
    }

    clear(): void {
        this.interruptRendering();
        this.layers = [];
        while (this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
        }
    }
}