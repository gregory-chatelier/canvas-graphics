/**
 * Does the rendering of a fish tank on a layer.
 */
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
var FishTank = /** @class */ (function (_super) {
    __extends(FishTank, _super);
    function FishTank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colors = {
            Pen1: 'LimeGreen',
            Pen2: 'Purple',
            Pen3: 'Cyan',
            Pen4: 'SeaGreen',
        };
        return _this;
    }
    FishTank.prototype.init = function () {
        this.ocean = new Ocean(150, this.layer.canvas.width, this.layer.canvas.height);
        document.addEventListener('oceanUpdatedEvent', function (event) {
            this.oceanUpdated(event);
        }.bind(this));
        this.mouseControls();
    };
    FishTank.prototype.mouseControls = function () {
        function handleMouseMove(e) {
            this.ocean.addObstacle(e.layerX, e.layerY, 10);
        }
        ;
        this.layer.canvas.addEventListener("mousedown", handleMouseMove.bind(this));
    };
    FishTank.prototype.oceanUpdated = function (e) {
        var _this = this;
        e.detail.obstacles.forEach(function (obstacle) { return _this.drawObstacle(obstacle); });
        e.detail.fishList.forEach(function (fish) { return _this.drawFish(fish); });
    };
    FishTank.prototype.drawObstacle = function (obstacle) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    FishTank.prototype.drawFish = function (fish) {
        var ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen3;
        var x1 = fish.x;
        var y1 = fish.y;
        var x2 = x1 - (16 * fish.speedX);
        var y2 = y1 - (16 * fish.speedY);
        var y3 = y1 - (19 * fish.speedY);
        var x3 = x1 - (19 * fish.speedX);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x1, y1, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x3, y3, 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    FishTank.prototype.draw = function () {
        this.layer.clear();
        this.ocean.updateEnvironment();
    };
    return FishTank;
}(Renderer));
//# sourceMappingURL=fish-tank.js.map