var CoordinateSystem = /** @class */ (function () {
    function CoordinateSystem(origin, unit) {
        this.origin = origin;
        this.unit = unit;
    }
    CoordinateSystem.prototype.scale = function (v) {
        return new Vector2D(this.scalex(v.x), this.scaley(v.y));
    };
    CoordinateSystem.prototype.scalex = function (x) {
        return this.origin.x + (x * this.unit);
    };
    CoordinateSystem.prototype.scaley = function (y) {
        return this.origin.y - (y * this.unit);
    };
    CoordinateSystem.prototype.unscale = function (v) {
        return new Vector2D(this.unscalex(v.x), this.unscaley(v.y));
    };
    CoordinateSystem.prototype.unscalex = function (x) {
        return (x - this.origin.x) / this.unit;
    };
    CoordinateSystem.prototype.unscaley = function (y) {
        return (this.origin.y - y) / this.unit;
    };
    CoordinateSystem.prototype.units = function (x) {
        return this.scalex(x) - this.origin.x;
    };
    return CoordinateSystem;
}());
//# sourceMappingURL=coordinate-system.js.map