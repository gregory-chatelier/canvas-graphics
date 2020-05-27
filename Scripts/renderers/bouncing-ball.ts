/**
 * Does the classic animation and control of a bouncing ball on a layer.
 */
class BouncingBall extends Renderer {
    location: Vector2D;
    velocity: Vector2D;

    init(): void {
        this.location = new Vector2D(100, 100);
        this.velocity = new Vector2D(2, 3.5);
        this.keyboardControls();
    };
    
    keyboardControls(): void {
        function handleKeyboardInput(e: KeyboardEvent): void {
            console.log(e.key);
            switch (e.key) {
                case 'ArrowDown':
                    this.velocity.rotate(-Math.PI * Math.random());
                    break;
                default:
            }
        }
        document.addEventListener("keyup", handleKeyboardInput.bind(this));
    }

    draw(): void {
        let ctx = this.layer.context();
        let width: number = this.layer.canvas.width;
        let height: number = this.layer.canvas.height;

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
    }
}
