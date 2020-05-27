
class ObjectInWorld {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    distanceTo(o: ObjectInWorld): number {
        return Math.sqrt(this.squareDistanceTo(o));
    }
    squareDistanceTo(o: ObjectInWorld): number {
        return (o.x - this.x) * (o.x - this.x)
            + (o.y - this.y) * (o.y - this.y);
    }
}

class BadZone extends ObjectInWorld {
    radius: number;
    timeToLive: number = 100;
    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }
    update() : void {
        this.timeToLive--;
    }
    dead(): boolean {
        return this.timeToLive <= 0;
    }
}

class FishAgent extends ObjectInWorld {
    STEP: number = 3;
    DISTANCE_MIN: number = 5;
    SQUARE_DISTANCE_MIN: number = 25;
    DISTANCE_MAX: number = 40;
    SQUARE_DISTANCE_MAX: number = 1600;

    speedX: number;
    speedY: number;
    constructor(x: number, y: number, dir: number) {
        super(x, y);
        this.speedX = Math.cos(dir);
        this.speedY = Math.sin(dir);
    }
    updatePosition(): void {
        this.x += this.STEP * this.speedX;
        this.y += this.STEP * this.speedY;
    }
    near(fish: FishAgent): boolean {
        let squareDistance: number = this.squareDistanceTo(fish);
        return squareDistance < this.SQUARE_DISTANCE_MAX
            && squareDistance > this.SQUARE_DISTANCE_MIN;
    }
    distanceToWall(xmin: number, ymin: number,
        xmax: number, ymax: number): number {
        return Math.min(
            this.x - xmin,
            this.y - ymin,
            ymax - this.y,
            xmax - this.x
        );
    }
    normalize(): void {
        let speedLength = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        this.speedX /= speedLength;
        this.speedY /= speedLength;
    }
    avoidWalls(xmin: number, ymin: number,
        xmax: number, ymax: number): boolean {
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
        let distance: number = this.distanceToWall(xmin, ymin, xmax, ymax);
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
    }
    avoidObstacle(obstacles: BadZone[]): boolean {
        if (!(obstacles instanceof Array) || !obstacles.length) {
            return;
        }
        let nearestObstacle: BadZone = null;

        let nearestObstacles: BadZone[] =
            obstacles.filter(x => this.squareDistanceTo(x)
                < x.radius * x.radius);

        if (nearestObstacles instanceof Array && nearestObstacles.length) {
            nearestObstacle = nearestObstacles.shift();
            let distanceToObstacle: number = this.distanceTo(nearestObstacle);
            let diffX: number = (nearestObstacle.x - this.x) / distanceToObstacle;
            let diffY: number = (nearestObstacle.y - this.y) / distanceToObstacle;
            this.speedX -= diffX / 2;
            this.speedY -= diffY / 2;
            this.normalize();
            return true;
        }
        return false;
    }
    avoidFish(fishAgent: FishAgent): boolean {
        let squareDistanceToFish: number = this.squareDistanceTo(fishAgent);
        if (squareDistanceToFish < this.SQUARE_DISTANCE_MIN) {
            let diffX: number = (fishAgent.x - this.x)
                / Math.sqrt(squareDistanceToFish);
            let diffY: number = (fishAgent.y - this.y)
                / Math.sqrt(squareDistanceToFish);
            this.speedX -= diffX / 4;
            this.speedY -= diffY / 4;
            this.normalize();
            return true;
        }
        return false;
    }
    computeAverageDirection(fishList: FishAgent[]): void {
        let fishUsed: FishAgent[] = fishList.filter(x => this.near(x));
        if (!(fishUsed instanceof Array)) {
            return;
        }
        let nbFish: number = fishUsed.length;
        if (nbFish >= 1) {
            let speedXTotal: number = 0;
            let speedYTotal: number = 0;
            for (let i = 0; i < fishUsed.length; i++) {
                let neighbour: FishAgent = fishUsed[i];
                speedXTotal += neighbour.speedX;
                speedYTotal += neighbour.speedY;
            }
            this.speedX = (speedXTotal / nbFish + this.speedX) / 2;
            this.speedY = (speedYTotal / nbFish + this.speedY) / 2;
            this.normalize();                
        }
    }
    update(fishList: FishAgent[], obstacles: BadZone[],
        maxWidth: number, maxHeight: number): void {
        if (!this.avoidWalls(0, 0, maxWidth, maxHeight)) {
            if (!this.avoidObstacle(obstacles)) {
                let squareDistances: number[] = fishList.filter(x => x !== this)
                    .map(x => x.squareDistanceTo(this));
                let squareDistanceMin = Math.min(...squareDistances);
                let fishes: FishAgent[] = fishList
                    .filter(x => x.squareDistanceTo(this) == squareDistanceMin);
                if (fishes !== undefined) {
                    if (!this.avoidFish(fishes.shift())) {
                        this.computeAverageDirection(fishList);
                    }
                }
            }
        }
        this.updatePosition();
    }
}

class Ocean {
    protected maxWidth: number;
    protected maxHeight: number;
    fishList: FishAgent[] = [];
    obstacles: BadZone[] = [];
    constructor(fishNb: number, width: number, height: number) {
        this.maxWidth = width;
        this.maxHeight = height;
        for (let i = 0; i < fishNb; i++) {
            this.fishList[i] = new FishAgent(
                Math.random() * this.maxWidth,
                Math.random() * this.maxHeight,
                Math.random() * 2 * Math.PI);
        }
    }
    addObstacle(x: number, y: number, radius: number): void {
        this.obstacles.push(new BadZone(x, y, radius));
    }
    updateObstacles(): void {
        this.obstacles.forEach(obstacle => obstacle.update());
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.dead());
    }
    updateFish(): void {
        this.fishList.forEach(fish => fish.update(this.fishList,
            this.obstacles, this.maxWidth, this.maxHeight));
    }
    updateEnvironment(): void {
        this.updateObstacles();
        this.updateFish();
        let event = new CustomEvent("oceanUpdatedEvent", {
            detail: {
                fishList: this.fishList,
                obstacles: this.obstacles
            }
        });
        document.dispatchEvent(event);
    }
}
