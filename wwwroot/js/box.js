var Box = /** @class */ (function () {
    function Box(topLeft, bottomRight) {
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
    return Box;
}());
//# sourceMappingURL=box.js.map