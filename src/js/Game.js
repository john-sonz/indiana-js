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
        this.playing = false;
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            indie.vel.set(0, 0);
            ctx.drawImage(images.score, 10, 260, 620, 130);

            function render() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, 640, 250);
                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);
                indie.draw(ctx, camera);

                if (this.playing) {
                    requestAnimationFrame(render);
                }
            }

            function update() {
                if (this.playing) {
                    indie.update(collider, camera);
                }
            };
            setInterval(update, 15);
            render();
        }
    }
    start(images, ctx, canvas) {
        this.playing = false;
        this.play(images, ctx, canvas);
    }
    end(ctx) {
        function endScreen() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 640, 400);
            ctx.fillStyle = "#d0dc71";
            ctx.fillText("YOU LOST", 640 / 2, 400 * 0.65);
            requestAnimationFrame(endScreen)
        }
        endScreen();
    }
}