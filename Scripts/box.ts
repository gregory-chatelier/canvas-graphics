class Box {
    topLeft: IPoint2D;
    bottomRight: IPoint2D;
    topRight: IPoint2D;
    bottomLeft: IPoint2D;
    top: any;
    left: any;
    bottom: any;
    right: any;
    width: number;
    height: number;
    centroid: IPoint2D;

    constructor(topLeft: IPoint2D, bottomRight: IPoint2D) {
        this.topLeft = topLeft;
        this.top = topLeft.y;
        this.left = topLeft.x;
        this.bottomRight = bottomRight;
        this.bottom = bottomRight.y;
        this.right = bottomRight.x;
        this.width = Math.abs(this.right - this.left);
        this.height = Math.abs(this.bottom - this.top);
        this.centroid = new Vector2D(this.width / 2, this.height / 2);
    }
}