// Include external library that handles 2D vectors
declare var Victor: any;

interface IPoint2D {
    x: number;
    y: number;
}

class Vector2D extends Victor implements IPoint2D {
    constructor(x: number, y: number) {
        super(x, y);
    }
    x: number;
    y: number;
}