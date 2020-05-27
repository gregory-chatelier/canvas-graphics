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