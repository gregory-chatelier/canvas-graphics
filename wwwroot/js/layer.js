var Rendering;
(function (Rendering) {
    Rendering[Rendering["Animation"] = 0] = "Animation";
    Rendering[Rendering["Paint"] = 1] = "Paint"; // The program does render only once
})(Rendering || (Rendering = {}));
/**
 *  A layer is an HTML Canvas element stacked over a container element.
 *  It is transparent by default and will be rendered by its order in the stack.
 */
var Layer = /** @class */ (function () {
    function Layer(name, index, width, height, backgroundColor, rendering) {
        this.renderers = [];
        this.rendererIteration = 0;
        this.name = name !== null && name !== void 0 ? name : "layer_" + index;
        this.rendering = rendering;
        this.canvas = document.createElement("canvas");
        this.canvas.id = uuid();
        this.canvas.width = width;
        this.canvas.height = height;
        var style = this.canvas.style;
        style.zIndex = String(index);
        style.backgroundColor = backgroundColor;
        style.top = "0px";
        style.position = "absolute";
        style.left = "0px";
        this.center = this.centroid();
        this.bounds = this.boundingbox();
    }
    Layer.prototype.context = function () {
        return this.canvas.getContext('2d');
    };
    Layer.prototype.centroid = function () {
        return new Vector2D(this.canvas.width / 2, this.canvas.height / 2);
    };
    Layer.prototype.boundingbox = function () {
        return new Box(new Vector2D(0, 0), new Vector2D(this.canvas.width, this.canvas.height));
    };
    Layer.prototype.setCoordinateSystem = function (coordinateSystem) {
        this.coordinateSystem = coordinateSystem;
    };
    Layer.prototype.addRenderer = function (renderer) {
        renderer.attachLayer(this);
        this.renderers.push(renderer);
    };
    Layer.prototype.clear = function () {
        this.context().clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Layer.prototype.render = function () {
        if (++this.rendererIteration > 1) {
            if (this.rendering === Rendering.Paint) {
                return;
            }
            this.clear();
        }
        for (var i = 0; i < this.renderers.length; i++) {
            this.renderers[i].draw();
        }
    };
    return Layer;
}());
//# sourceMappingURL=layer.js.map