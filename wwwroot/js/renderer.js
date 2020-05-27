/**
 *  Base class for program that do the rendering of a drawing on a layer.
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.attachLayer = function (layer) {
        this.layer = layer;
        this.init();
    };
    Renderer.prototype.init = function () {
        throw new Error("Method not implemented.");
    };
    Renderer.prototype.draw = function () {
        throw new Error("Method not implemented.");
    };
    return Renderer;
}());
//# sourceMappingURL=renderer.js.map