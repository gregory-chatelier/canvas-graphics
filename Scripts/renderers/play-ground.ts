
interface MouseEvent extends UIEvent {
    layerX: any;
    layerY: any;
}

class Mover {
    location: Vector2D;
    velocity: Vector2D;
    renderer: Renderer;

    constructor(renderer: Renderer, location: Vector2D, velocity: Vector2D) {
        this.renderer = renderer;
        this.location = location;
        this.velocity = velocity;
    }

    update(): void {
        this.location.add(this.velocity);
    }

    display(): void {
        let ctx = this.renderer.layer.context();

        ctx.beginPath();

        ctx.arc(this.location.x, this.location.y, 20, 0, 2 * Math.PI, true);

        ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillStyle = 'rgba(155, 80, 250, 0.6)';

        ctx.stroke();
        ctx.fill();
    }

    checkEdges() {
        let width = this.renderer.layer.canvas.width;
        let height = this.renderer.layer.canvas.height;

        if (this.location.x > width) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = width;
        }

        if (this.location.y > height) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = height;
        }
    }
}


class PlayGround extends Renderer {
    ocean: Ocean;
    mousePosition: Vector2D;

    private colors = {
        Pen1: 'LimeGreen',
        Pen2: 'Purple',
        Pen3: 'Cyan',
        Pen4: 'SeaGreen',
    }
    mover: Mover;

    init(): void {
        //this.mouseControls();

        this.mover = new Mover(this,
            new Vector2D(Math.random() * this.layer.canvas.width, Math.random() * this.layer.canvas.height),
            new Vector2D((Math.random() * 4) - 2, (Math.random() * 4) - 2));
    }

    mouseControls(): void {
        function handleMouseMove(e: MouseEvent): void {
            this.mousePosition = new Vector2D(e.layerX, e.layerY);
            this.drawFromCenterToMouse();
        };
        this.layer.canvas.addEventListener("mousemove", handleMouseMove.bind(this));
    }

    drawFromCenterToMouse(): void {
        if (this.mousePosition instanceof Vector2D) {
            this.layer.clear();
            this.drawLine(this.mousePosition, this.layer.center);
            this.drawMagnitude(this.mousePosition.clone().subtract(this.layer.center));
        }
    }

    drawMagnitude(v: Vector2D) {
        let ctx = this.layer.context();
        ctx.save();

        ctx.fillStyle = this.colors.Pen2;

        ctx.beginPath();
        ctx.rect(0, 0, v.magnitude(), 10);
        ctx.fill();

        ctx.restore();
    }

    drawLine(v1: Vector2D, v2: Vector2D) : void {
        let ctx = this.layer.context();
        ctx.save();

        ctx.strokeStyle = this.colors.Pen1;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();

        ctx.restore();
    }

    draw(): void {
        //this.drawFromCenterToMouse();

        //console.log(this.mover);

        this.mover.update();
        this.mover.checkEdges();
        this.mover.display();
    }
}
