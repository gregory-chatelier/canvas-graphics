/**
 * Main entry point - Runs after page is loaded
 */
function main() {
    // A canvas is a stack of transparent canvas HTML elements.
    // They are superposed as layers on which we can draw
    var canvas = new Canvas("canvas-layers");
    // Multi agents exemple by default
    var layer = canvas.addLayer("Play Ground", Rendering.Animation);
    layer.addRenderer(new PlayGround());
    canvas.render(7, 10000);
    // Other exemples on demand
    var choice = document.getElementById('program-choice');
    choice.addEventListener('change', function () {
        switch (choice.options[choice.selectedIndex].value) {
            // Bouncing ball exemple : a simple ball that bounces over the edges
            case 'BOUNCING_BALL':
                canvas.clear();
                // Each layer has a collection of renderers programs.
                // These programs are where to place the drawing code.
                var layer1 = canvas.addLayer("Smiley drawing");
                layer1.setCoordinateSystem(new CoordinateSystem(layer1.center, 5));
                //layer1.addRenderer(new Grid());
                layer1.addRenderer(new Smiley());
                var layer2 = canvas.addLayer("Bouncing ball", Rendering.Animation);
                // Some 'animation' programs can render in a loop.
                layer2.addRenderer(new BouncingBall());
                canvas.render(7, 10000);
                //canvas.render();
                break;
            // Multi agents exemple : some fish comportement in an environment
            case 'FISH_TANK':
            default:
                canvas.clear();
                var layer_1 = canvas.addLayer("Fish tank", Rendering.Animation);
                layer_1.addRenderer(new FishTank());
                canvas.render(4, 10000);
                break;
        }
    }.bind(choice));
}
window.onload = main;
//# sourceMappingURL=app.js.map