/**
 * Does the rendering of a smiley on a layer.
 */
class Smiley extends Renderer {
    init(): void { };
    
    draw(): void {
        let ctx = this.layer.context();
        
        ctx.strokeStyle = 'SeaGreen';

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);  // Cercle extérieur
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Bouche (sens horaire)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Oeil gauche
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Oeil droite
        ctx.stroke();
    }
}
