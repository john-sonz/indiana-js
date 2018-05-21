import {
    createIndie
} from "./entities.js";


export default class Game {
    constructor(spriteSheet) {
        const indie = createIndie(spriteSheet);
        const gravity = 0.3;
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            indie.vel.x = 3;
            indie.vel.y = -5;
            function render() {
                ctx.drawImage(images.bg, 0, 270, 320, 200, 0, 0, canvas.width, 250);
                ctx.drawImage(images.score, 10, 260, 620, 130);
                indie.update();
                indie.vel.y += gravity;
                indie.draw(ctx);                
                requestAnimationFrame(render);
            }
            render();
        }
    }
    start(images, ctx, canvas) {
        this.play(images, ctx, canvas);
    }
}