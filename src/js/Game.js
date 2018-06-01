import {
    createIndie
} from "./entities.js";
import Camera from "./Camera.js";
import Collider from "./Collider.js";


export default class Game {
    constructor(spriteSheet) {
        const indie = createIndie(spriteSheet);
        const gravity = 0.3;
        const camera = new Camera();
        const collider = new Collider("collision1-1.png");        
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            indie.vel.set(0, 0);

            function render() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);

                ctx.drawImage(images.score, 10, 260, 620, 130);

                indie.update(collider);
                indie.draw(ctx, camera);
                requestAnimationFrame(render);
            }
            render();
        }
    }
    start(images, ctx, canvas) {
        this.play(images, ctx, canvas);
    }
}