
/**
 * Does the rendering of a grid on a layer.
 */
class Grid extends Renderer {
    init(): void { };

    private colors = {
        Pen1: 'LimeGreen',
        Pen2: 'Purple',
        Pen3: 'Cyan',
        Pen4: 'SeaGreen',
    }

    private squarePoint(cs: CoordinateSystem, pt: IPoint2D): void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(cs.scalex(pt.x), cs.scaley(pt.y), 5, 5);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    private roundPoint(cs: CoordinateSystem, pt: IPoint2D): void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen1;
        ctx.fillStyle = this.colors.Pen2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cs.scalex(pt.x), cs.scaley(pt.y), 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    private line(cs: CoordinateSystem, pt1: IPoint2D, pt2: IPoint2D, color: string): void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.moveTo(cs.scalex(pt1.x), cs.scaley(pt1.y));
        ctx.lineTo(cs.scalex(pt2.x), cs.scaley(pt2.y));
        ctx.stroke();
        ctx.restore();
    }

    private circle(cs: CoordinateSystem, center: IPoint2D, radius: number, color: string): void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(cs.scalex(center.x), cs.scaley(center.y), cs.units(radius), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    private axes(cs: CoordinateSystem, center: IPoint2D, padding: number): void {
        let ctx = this.layer.context();
        ctx.save();
        ctx.strokeStyle = this.colors.Pen3;
        ctx.beginPath();

        let X = cs.scalex(center.x);
        let Y = cs.scaley(center.y);

        ctx.moveTo(X, Y);
        ctx.lineTo(X + cs.units(80), Y);

        ctx.font = "12px Arial";
        ctx.fillStyle = this.colors.Pen3;

        for (let x = 0; x < 80 + 10; x += 10) {
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

        for (let y = 0; y < 50 + 10; y += 10) {
            ctx.moveTo(X + 3, Y - cs.units(y));
            ctx.lineTo(X - 3, Y - cs.units(y));
            if (y > 0) {
                ctx.fillText(String(y), X - 21, Y - cs.units(y) + 5);
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    draw(): void {

        let ctx = this.layer.context();
        let cs = <CoordinateSystem>this.layer.coordinateSystem;
        let frame = this.layer.bounds;
        let center: IPoint2D = new Vector2D(0, 0);

        let cellw = frame.width * (1 / 4);
        let cellh = frame.height * (1 / 4);
        let padding = 35;

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
        let A = new Vector2D(20, 10);
        let B = new Vector2D(40, 40);
        let C = new Vector2D(40, 10);
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
        let D = new Vector2D(10, 10);
        let E = new Vector2D(50, 25);
        let F = new Vector2D(60, 40);
        let G = new Vector2D(65, 35);
        let H = new Vector2D(50, 10);
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
    }
}
