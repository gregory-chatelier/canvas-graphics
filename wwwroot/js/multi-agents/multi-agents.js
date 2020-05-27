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
var ObjectInWorld = /** @class */ (function () {
    function ObjectInWorld(x, y) {
        this.x = x;
        this.y = y;
    }
    ObjectInWorld.prototype.distanceTo = function (o) {
        return Math.sqrt(this.squareDistanceTo(o));
    };
    ObjectInWorld.prototype.squareDistanceTo = function (o) {
        return (o.x - this.x) * (o.x - this.x)
            + (o.y - this.y) * (o.y - this.y);
    };
    return ObjectInWorld;
}());
var BadZone = /** @class */ (function (_super) {
    __extends(BadZone, _super);
    function BadZone(x, y, radius) {
        var _this = _super.call(this, x, y) || this;
        _this.timeToLive = 100;
        _this.radius = radius;
        return _this;
    }
    BadZone.prototype.update = function () {
        this.timeToLive--;
    };
    BadZone.prototype.dead = function () {
        return this.timeToLive <= 0;
    };
    return BadZone;
}(ObjectInWorld));
var FishAgent = /** @class */ (function (_super) {
    __extends(FishAgent, _super);
    function FishAgent(x, y, dir) {
        var _this = _super.call(this, x, y) || this;
        _this.STEP = 3;
        _this.DISTANCE_MIN = 5;
        _this.SQUARE_DISTANCE_MIN = 25;
        _this.DISTANCE_MAX = 40;
        _this.SQUARE_DISTANCE_MAX = 1600;
        _this.speedX = Math.cos(dir);
        _this.speedY = Math.sin(dir);
        return _this;
    }
    FishAgent.prototype.updatePosition = function () {
        this.x += this.STEP * this.speedX;
        this.y += this.STEP * this.speedY;
    };
    FishAgent.prototype.near = function (fish) {
        var squareDistance = this.squareDistanceTo(fish);
        return squareDistance < this.SQUARE_DISTANCE_MAX
            && squareDistance > this.SQUARE_DISTANCE_MIN;
    };
    FishAgent.prototype.distanceToWall = function (xmin, ymin, xmax, ymax) {
        return Math.min(this.x - xmin, this.y - ymin, ymax - this.y, xmax - this.x);
    };
    FishAgent.prototype.normalize = function () {
        var speedLength = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        this.speedX /= speedLength;
        this.speedY /= speedLength;
    };
    FishAgent.prototype.avoidWalls = function (xmin, ymin, xmax, ymax) {
        if (this.x < xmin) {
            this.x = xmin;
        }
        if (this.y < ymin) {
            this.y = ymin;
        }
        if (this.x > xmax) {
            this.x = xmax;
        }
        if (this.y > ymax) {
            this.y = ymax;
        }
        var distance = this.distanceToWall(xmin, ymin, xmax, ymax);
        if (distance < this.DISTANCE_MIN) {
            if (distance == (this.x - xmin)) {
                this.speedX += 0.3;
            }
            else if (distance == (this.y - ymin)) {
                this.speedY += 0.3;
            }
            else if (distance == (xmax - this.x)) {
                this.speedX -= 0.3;
            }
            else if (distance == (ymax - this.y)) {
                this.speedY -= 0.3;
            }
            this.normalize();
            return true;
        }
        return false;
    };
    FishAgent.prototype.avoidObstacle = function (obstacles) {
        var _this = this;
        if (!(obstacles instanceof Array) || !obstacles.length) {
            return;
        }
        var nearestObstacle = null;
        var nearestObstacles = obstacles.filter(function (x) { return _this.squareDistanceTo(x)
            < x.radius * x.radius; });
        if (nearestObstacles instanceof Array && nearestObstacles.length) {
            nearestObstacle = nearestObstacles.shift();
            var distanceToObstacle = this.distanceTo(nearestObstacle);
            var diffX = (nearestObstacle.x - this.x) / distanceToObstacle;
            var diffY = (nearestObstacle.y - this.y) / distanceToObstacle;
            this.speedX -= diffX / 2;
            this.speedY -= diffY / 2;
            this.normalize();
            return true;
        }
        return false;
    };
    FishAgent.prototype.avoidFish = function (fishAgent) {
        var squareDistanceToFish = this.squareDistanceTo(fishAgent);
        if (squareDistanceToFish < this.SQUARE_DISTANCE_MIN) {
            var diffX = (fishAgent.x - this.x)
                / Math.sqrt(squareDistanceToFish);
            var diffY = (fishAgent.y - this.y)
                / Math.sqrt(squareDistanceToFish);
            this.speedX -= diffX / 4;
            this.speedY -= diffY / 4;
            this.normalize();
            return true;
        }
        return false;
    };
    FishAgent.prototype.computeAverageDirection = function (fishList) {
        var _this = this;
        var fishUsed = fishList.filter(function (x) { return _this.near(x); });
        if (!(fishUsed instanceof Array)) {
            return;
        }
        var nbFish = fishUsed.length;
        if (nbFish >= 1) {
            var speedXTotal = 0;
            var speedYTotal = 0;
            for (var i = 0; i < fishUsed.length; i++) {
                var neighbour = fishUsed[i];
                speedXTotal += neighbour.speedX;
                speedYTotal += neighbour.speedY;
            }
            this.speedX = (speedXTotal / nbFish + this.speedX) / 2;
            this.speedY = (speedYTotal / nbFish + this.speedY) / 2;
            this.normalize();
        }
    };
    FishAgent.prototype.update = function (fishList, obstacles, maxWidth, maxHeight) {
        var _this = this;
        if (!this.avoidWalls(0, 0, maxWidth, maxHeight)) {
            if (!this.avoidObstacle(obstacles)) {
                var squareDistances = fishList.filter(function (x) { return x !== _this; })
                    .map(function (x) { return x.squareDistanceTo(_this); });
                var squareDistanceMin_1 = Math.min.apply(Math, squareDistances);
                var fishes = fishList
                    .filter(function (x) { return x.squareDistanceTo(_this) == squareDistanceMin_1; });
                if (fishes !== undefined) {
                    if (!this.avoidFish(fishes.shift())) {
                        this.computeAverageDirection(fishList);
                    }
                }
            }
        }
        this.updatePosition();
    };
    return FishAgent;
}(ObjectInWorld));
var Ocean = /** @class */ (function () {
    function Ocean(fishNb, width, height) {
        this.fishList = [];
        this.obstacles = [];
        this.maxWidth = width;
        this.maxHeight = height;
        for (var i = 0; i < fishNb; i++) {
            this.fishList[i] = new FishAgent(Math.random() * this.maxWidth, Math.random() * this.maxHeight, Math.random() * 2 * Math.PI);
        }
    }
    Ocean.prototype.addObstacle = function (x, y, radius) {
        this.obstacles.push(new BadZone(x, y, radius));
    };
    Ocean.prototype.updateObstacles = function () {
        this.obstacles.forEach(function (obstacle) { return obstacle.update(); });
        this.obstacles = this.obstacles.filter(function (obstacle) { return !obstacle.dead(); });
    };
    Ocean.prototype.updateFish = function () {
        var _this = this;
        this.fishList.forEach(function (fish) { return fish.update(_this.fishList, _this.obstacles, _this.maxWidth, _this.maxHeight); });
    };
    Ocean.prototype.updateEnvironment = function () {
        this.updateObstacles();
        this.updateFish();
        var event = new CustomEvent("oceanUpdatedEvent", {
            detail: {
                fishList: this.fishList,
                obstacles: this.obstacles
            }
        });
        document.dispatchEvent(event);
    };
    return Ocean;
}());
//# sourceMappingURL=multi-agents.js.map