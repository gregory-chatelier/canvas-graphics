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
var Mover = /** @class */ (function () {
    function Mover(renderer, location, velocity) {
        this.renderer = renderer;
        this.location = location;
        this.velocity = velocity;
    }
    Mover.prototype.update = function () {
        this.location.add(this.velocity);
    };
    Mover.prototype.display = function () {
        var ctx = this.renderer.layer.context();
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 20, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillStyle = 'rgba(155, 80, 250, 0.6)';
        ctx.stroke();
        ctx.fill();
    };
    Mover.prototype.checkEdges = function () {
        var width = this.renderer.layer.canvas.width;
        var height = this.renderer.layer.canvas.height;
        if (this.location.x > width) {
            this.location.x = 0;
        }
        else if (this.location.x < 0) {
            this.location.x = width;
        }
        if (this.location.y > height) {
            this.location.y = 0;
        }
        else if (this.location.y < 0) {
            this.location.y = height;
        }
    };
    return Mover;
}());
var PlayGround = /** @class */ (function (_super) {
    __extends(PlayGround, _super);
    function PlayGround() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colors = {
            Pen1: 'LimeGreen',
            Pen2: 'Purple',
            Pen3: 'Cyan',
            Pen4: 'SeaGreen',
        };
        return _this;
    }
    PlayGround.prototype.init = function () {
        //this.mouseControls();
        this.mover = new Mover(this, new Vector2D(Math.random() * this.layer.canvas.width, Math.random() * this.layer.canvas.height), new Vector2D((Math.random() * 4) - 2, (Math.random() * 4) - 2));
    };
    PlayGround.prototype.mouseControls = function () {
        function handleMouseMove(e) {
            this.mousePosition = new Vector2D(e.layerX, e.layerY);
            this.drawFromCenterToMouse();
        }
        ;
        this.layer.canvas.addEventListener("mousemove", handleMouseMove.bind(this));
    };
    PlayGround.prototype.drawFromCenterToMouse = function () {
        if (this.mousePosition instanceof Vector2D) {
            this.layer.clear();
            this.drawLine(this.mousePosition, this.layer.center);
            this.drawMagnitude(this.mousePosition.clone().subtract(this.layer.center));
        }
    };
    PlayGround.prototype.drawMagnitude = function (v) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.fillStyle = this.colors.Pen2;
        ctx.beginPath();
        ctx.rect(0, 0, v.magnitude(), 10);
        ctx.fill();
        ctx.restore();
    };
    PlayGround.prototype.drawLine = function (v1, v2) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
        ctx.restore();
    };
    PlayGround.prototype.draw = function () {
        //this.drawFromCenterToMouse();
        //console.log(this.mover);
        this.mover.update();
        this.mover.checkEdges();
        this.mover.display();
    };
    return PlayGround;
}(Renderer));
//# sourceMappingURL=play-ground.js.map