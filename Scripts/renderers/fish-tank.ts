/**
 * Does the rendering of a fish tank on a layer.
 */

interface MouseEvent extends UIEvent {
    layerX: any;
    layerY: any;
}

class FishTank extends Renderer {
    ocean: Ocean;

    private colors = {
        Pen1: 'LimeGreen',
        Pen2: 'Purple',
        Pen3: 'Cyan',
        Pen4: 'SeaGreen',
    }

    init(): void {
        this.ocean = new Ocean(150, this.layer.canvas.width, this.layer.canvas.height);
        document.addEventListener('oceanUpdatedEvent', function (event) {
            this.oceanUpdated(<CustomEvent>event);
        }.bind(this));
        this.mouseControls();
    }

    mouseControls(): void {
        function handleMouseMove(e: MouseEvent): void {
            this.ocean.addObstacle(e.layerX, e.layerY, 10)
        };
        this.layer.canvas.addEventListener("mousedown", handleMouseMove.bind(this));
    }

    oceanUpdated(e: CustomEvent): void {
        e.detail.obstacles.forEach(obstacle => this.drawObstacle(obstacle));
        e.detail.fishList.forEach(fish => this.drawFish(fish));
    }

    drawObstacle(obstacle: BadZone) : void {
        let ctx = this.layer.context();
        ctx.save();

        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    drawFish(fish: FishAgent) : void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen3;

        let x1 = fish.x;
        let y1 = fish.y;
        let x2 = x1 - (16 * fish.speedX);
        let y2 = y1 - (16 * fish.speedY);
        let y3 = y1 - (19 * fish.speedY);
        let x3 = x1 - (19 * fish.speedX);

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
    }

    draw(): void {
        this.layer.clear();
        this.ocean.updateEnvironment();
    }
}
