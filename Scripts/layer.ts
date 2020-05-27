declare var uuid: any;

enum Rendering {
    Animation,                  // The program does render in a loop. 
    Paint                       // The program does render only once
}

/** 
 *  A layer is an HTML Canvas element stacked over a container element.
 *  It is transparent by default and will be rendered by its order in the stack.
 */
class Layer {
    name: string;
    canvas: HTMLCanvasElement;
    renderers: Renderer[] = [];
    rendererIteration: number = 0;
    coordinateSystem: ICoordinateSystem;
    bounds: Box;
    center: Vector2D;
    rendering: Rendering;

    constructor(name: string, index: number, width: number, height: number,
        backgroundColor: string, rendering: Rendering) {
        this.name = name ?? "layer_" + index;
        this.rendering = rendering;

        this.canvas = <HTMLCanvasElement>document.createElement("canvas");
        this.canvas.id = uuid();
        this.canvas.width = width;
        this.canvas.height = height;

        let style = this.canvas.style;

        style.zIndex = String(index);
        style.backgroundColor = backgroundColor;
        style.top = "0px";
        style.position = "absolute";
        style.left = "0px";

        this.center = this.centroid();
        this.bounds = this.boundingbox();
    }

    context(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    private centroid(): Vector2D {
        return new Vector2D(this.canvas.width / 2, this.canvas.height / 2);
    }

    private boundingbox(): Box {
        return new Box(
            new Vector2D(0, 0),
            new Vector2D(this.canvas.width, this.canvas.height)
        );
    }

    setCoordinateSystem(coordinateSystem: ICoordinateSystem): void {
        this.coordinateSystem = coordinateSystem;
    }

    addRenderer(renderer: Renderer): void {
        renderer.attachLayer(this);
        this.renderers.push(renderer);
    }

    clear(): void {
        this.context().clearRect(0, 0,
            this.canvas.width, this.canvas.height);
    }

    render(): void {
        if (++this.rendererIteration > 1) {
            if (this.rendering === Rendering.Paint) {
                return;
            }
            this.clear();
        } 
        for (let i = 0; i < this.renderers.length; i++) {
            this.renderers[i].draw();
        }
    }
}
