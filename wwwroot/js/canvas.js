/**
 *  A canvas is a collection of stacked layers.
 *  Rendering can be called in a loop to perform animations.
 */
var Canvas = /** @class */ (function () {
    function Canvas(containerId) {
        this.layers = [];
        this.container = document.getElementById(containerId);
    }
    Canvas.prototype.addLayer = function (name, rendering, backgroundColor) {
        if (name === void 0) { name = null; }
        if (rendering === void 0) { rendering = Rendering.Paint; }
        if (backgroundColor === void 0) { backgroundColor = "transparent"; }
        var index = this.layers.length;
        var layer = new Layer(name, index, this.container.clientWidth, this.container.clientHeight, backgroundColor, rendering);
        this.layers.push(layer);
        return layer;
    };
    Canvas.prototype.render = function (loopInterval, maxIterations) {
        if (loopInterval === void 0) { loopInterval = null; }
        if (maxIterations === void 0) { maxIterations = Number.POSITIVE_INFINITY; }
        for (var i = 0; i < this.layers.length; i++) {
            this.container.appendChild(this.layers[i].canvas);
        }
        if (!loopInterval || loopInterval < 2) {
            this.renderFrame();
            return;
        }
        this.iterations = 0;
        var self = this;
        this.handleKeyboardEscape = function (e) {
            if (e.key === "Escape") {
                self.interruptRendering();
            }
        };
        document.addEventListener("keyup", this.handleKeyboardEscape);
        this.intervalId = setInterval(function () {
            if (++self.iterations > maxIterations) {
                self.interruptRendering();
            }
            self.renderFrame();
        }, loopInterval);
    };
    Canvas.prototype.renderFrame = function () {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].render();
        }
    };
    Canvas.prototype.interruptRendering = function () {
        try {
            clearInterval(this.intervalId);
            document.removeEventListener("keyup", this.handleKeyboardEscape);
            console.log('Rendering interrupted.');
        }
        catch (e) {
            console.error('No rendering to interrupt.');
        }
    };
    Canvas.prototype.clear = function () {
        this.interruptRendering();
        this.layers = [];
        while (this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
        }
    };
    return Canvas;
}());
//# sourceMappingURL=canvas.js.map