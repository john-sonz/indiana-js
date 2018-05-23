import {
    createIndie
} from "./entities.js";
import Camera from "./Camera.js";


export default class Game {
    constructor(spriteSheet) {
        const indie = createIndie(spriteSheet);
        const gravity = 0.3;
        const camera = new Camera();
        camera.pos.set(0,270);
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            indie.vel.set(0, 0);

            function render() {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 200, 0, 0, canvas.width, 250);
                ctx.drawImage(images.score, 10, 260, 620, 130);
                indie.update();
                indie.draw(ctx,camera);
                requestAnimationFrame(render);
            }
            render();
        }
    }
    start(images, ctx, canvas) {
        this.play(images, ctx, canvas);
    }
}