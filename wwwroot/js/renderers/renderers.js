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
 * Does the classic animation and control of a bouncing ball on a layer.
 */
var BouncingBall = /** @class */ (function (_super) {
    __extends(BouncingBall, _super);
    function BouncingBall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BouncingBall.prototype.init = function () {
        this.location = new Vector2D(100, 100);
        this.velocity = new Vector2D(2, 3.5);
        this.keyboardControls();
    };
    ;
    BouncingBall.prototype.keyboardControls = function () {
        function handleKeyboardInput(e) {
            console.log(e.key);
            switch (e.key) {
                case 'ArrowDown':
                    this.velocity.rotate(-Math.PI * Math.random());
                    break;
                default:
            }
        }
        document.addEventListener("keyup", handleKeyboardInput.bind(this));
    };
    BouncingBall.prototype.draw = function () {
        var ctx = this.layer.context();
        var width = this.layer.canvas.width;
        var height = this.layer.canvas.height;
        ctx.beginPath();
        // Move the ball according to its speed
        this.location.add(this.velocity);
        // Check for bouncing.
        if ((this.location.x > width) || (this.location.x < 0)) {
            this.velocity.x *= -1;
        }
        if ((this.location.y > height) || (this.location.y < 0)) {
            this.velocity.y *= -1;
        }
        // Display the ball at the location(x, y).
        ctx.arc(this.location.x, this.location.y, 20, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillStyle = 'rgba(155, 80, 250, 0.6)';
        ctx.stroke();
        ctx.fill();
    };
    return BouncingBall;
}(Renderer));
//# sourceMappingURL=bouncing-ball.js.map
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
 * Does the rendering of a grid on a layer.
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colors = {
            Pen1: 'LimeGreen',
            Pen2: 'Purple',
            Pen3: 'Cyan',
            Pen4: 'SeaGreen',
        };
        return _this;
    }
    Grid.prototype.init = function () { };
    ;
    Grid.prototype.squarePoint = function (cs, pt) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(cs.scalex(pt.x), cs.scaley(pt.y), 5, 5);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    Grid.prototype.roundPoint = function (cs, pt) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cs.scalex(pt.x), cs.scaley(pt.y), 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    Grid.prototype.line = function (cs, pt1, pt2, color) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.moveTo(cs.scalex(pt1.x), cs.scaley(pt1.y));
        ctx.lineTo(cs.scalex(pt2.x), cs.scaley(pt2.y));
        ctx.stroke();
        ctx.restore();
    };
    Grid.prototype.circle = function (cs, center, radius, color) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(cs.scalex(center.x), cs.scaley(center.y), cs.units(radius), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    };
    Grid.prototype.axes = function (cs, center, padding) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen3;
        ctx.beginPath();
        var X = cs.scalex(center.x);
        var Y = cs.scaley(center.y);
        ctx.moveTo(X, Y);
        ctx.lineTo(X + cs.units(80), Y);
        ctx.font = "12px Arial";
        ctx.fillStyle = this.colors.Pen3;
        for (var x = 0; x < 80 + 10; x += 10) {
            ctx.moveTo(X + cs.units(x), Y - 3);
            ctx.lineTo(X + cs.units(x), Y + 3);
            if (x > 0) {
                ctx.fillText(String(x), X + cs.units(x) - 7, Y + 17);
            }
        }
        X = cs.scalex(center.x);
        Y = cs.scaley(center.y);
        ctx.moveTo(X, Y);
        ctx.lineTo(X, Y - cs.units(50));
        for (var y = 0; y < 50 + 10; y += 10) {
            ctx.moveTo(X + 3, Y - cs.units(y));
            ctx.lineTo(X - 3, Y - cs.units(y));
            if (y > 0) {
                ctx.fillText(String(y), X - 21, Y - cs.units(y) + 5);
            }
        }
        ctx.stroke();
        ctx.restore();
    };
    Grid.prototype.draw = function () {
        var ctx = this.layer.context();
        var cs = this.layer.coordinateSystem;
        var frame = this.layer.bounds;
        var center = new Vector2D(0, 0);
        var cellw = frame.width * (1 / 4);
        var cellh = frame.height * (1 / 4);
        var padding = 35;
        // Monte carlo integration of a circle|polygon
        ctx.save();
        // Move canvas origin to north-east quadrant center
        ctx.translate(cellw, -cellh);
        // Move canvas origin to north-east quadrant bottom left point (Uses only x > 0, y > 0)
        ctx.translate(-cellw + padding, cellh - padding);
        this.axes(cs, center, padding);
        this.roundPoint(cs, center);
        this.circle(cs, new Vector2D(35, 25), 15, this.colors.Pen1);
        // Square
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen4;
        ctx.rect(cs.scalex(20), cs.scaley(40), cs.units(30), cs.units(30));
        ctx.stroke();
        ctx.restore();
        ctx.save();
        // Move canvas origin to north-west quadrant
        ctx.translate(-cellw, -cellh);
        // Move canvas origin to north-east quadrant bottom left point (Uses only x > 0, y > 0)
        ctx.translate(-cellw + padding, cellh - padding);
        this.axes(cs, center, padding);
        this.roundPoint(cs, center);
        this.circle(cs, new Vector2D(35, 25), 15, this.colors.Pen1);
        // Rectangle
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen4;
        ctx.rect(cs.scalex(0), cs.scaley(45), cs.units(70), cs.units(45));
        ctx.stroke();
        ctx.restore();
        ctx.save();
        // Move canvas origin to south-west quadrant
        ctx.translate(-cellw, cellh);
        // Move canvas origin to north-east quadrant bottom left point (Uses only x > 0, y > 0)
        ctx.translate(-cellw + padding, cellh - padding);
        this.axes(cs, center, padding);
        this.roundPoint(cs, center);
        // Triangle
        var A = new Vector2D(20, 10);
        var B = new Vector2D(40, 40);
        var C = new Vector2D(40, 10);
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.moveTo(cs.scalex(A.x), cs.scaley(A.y));
        ctx.lineTo(cs.scalex(B.x), cs.scaley(B.y));
        ctx.lineTo(cs.scalex(C.x), cs.scaley(C.y));
        ctx.lineTo(cs.scalex(A.x), cs.scaley(A.y));
        ctx.closePath();
        ctx.stroke();
        // Rectangle
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen4;
        ctx.rect(cs.scalex(0), cs.scaley(45), cs.units(70), cs.units(45));
        ctx.stroke();
        ctx.restore();
        ctx.save();
        // Move canvas origin to south-east quadrant
        ctx.translate(cellw, cellh);
        // Move canvas origin to north-east quadrant bottom left point (Uses only x > 0, y > 0)
        ctx.translate(-cellw + padding, cellh - padding);
        this.axes(cs, center, padding);
        this.roundPoint(cs, center);
        // Polygon
        var D = new Vector2D(10, 10);
        var E = new Vector2D(50, 25);
        var F = new Vector2D(60, 40);
        var G = new Vector2D(65, 35);
        var H = new Vector2D(50, 10);
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.moveTo(cs.scalex(D.x), cs.scaley(D.y));
        ctx.moveTo(cs.scalex(E.x), cs.scaley(E.y));
        ctx.lineTo(cs.scalex(F.x), cs.scaley(F.y));
        ctx.lineTo(cs.scalex(G.x), cs.scaley(G.y));
        ctx.lineTo(cs.scalex(H.x), cs.scaley(H.y));
        ctx.lineTo(cs.scalex(D.x), cs.scaley(D.y));
        ctx.closePath();
        ctx.stroke();
        // Rectangle
        ctx.beginPath();
        ctx.strokeStyle = this.colors.Pen4;
        ctx.rect(cs.scalex(0), cs.scaley(45), cs.units(70), cs.units(45));
        ctx.stroke();
        ctx.restore();
        // Restore state for next renderer
        ctx.restore();
    };
    return Grid;
}(Renderer));
//# sourceMappingURL=grid.js.map
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