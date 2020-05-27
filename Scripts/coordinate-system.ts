
interface ICoordinateSystem {}

class CoordinateSystem implements ICoordinateSystem {
    origin: IPoint2D;
    unit: number;

    constructor(origin: IPoint2D, unit: number) {
        this.origin = origin;
        this.unit = unit;
    }

    scale(v: IPoint2D): IPoint2D {
        return new Vector2D(
            this.scalex(v.x),
            this.scaley(v.y)
        );
    }

    scalex(x: number): number {
        return this.origin.x + (x * this.unit);
    }

    scaley(y: number): number {
        return this.origin.y - (y * this.unit);
    }

    unscale(v: IPoint2D): IPoint2D {
        return new Vector2D(
            this.unscalex(v.x),
            this.unscaley(v.y)
        );
    }

    unscalex(x: number): number {
        return (x - this.origin.x) / this.unit;
    }

    unscaley(y: number): number {
        return (this.origin.y - y) / this.unit;
    }

    units(x: number) {
        return this.scalex(x) - this.origin.x;
    }

}