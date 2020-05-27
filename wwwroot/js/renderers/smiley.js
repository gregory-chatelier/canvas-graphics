var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Does the rendering of a smiley on a layer.
 */
var Smiley = /** @class */ (function (_super) {
    __extends(Smiley, _super);
    function Smiley() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Smiley.prototype.init = function () { };
    ;
    Smiley.prototype.draw = function () {
        var ctx = this.layer.context();
        ctx.strokeStyle = 'SeaGreen';
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Cercle extérieur
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Bouche (sens horaire)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Oeil gauche
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Oeil droite
        ctx.stroke();
    };
    return Smiley;
}(Renderer));
//# sourceMappingURL=smiley.js.map