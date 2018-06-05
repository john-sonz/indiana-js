import {
    createIndie
} from "./entities.js";
import Camera from "./Camera.js";
import Collider from "./Collider.js";
import Light from "./Light.js";


export default class Game {
    constructor(spriteSheet, imgs) {
        const indie = createIndie(spriteSheet);
        const gravity = 0.3;
        const camera = new Camera();
        let scoreboard = {
            needsUpdate: false
        }
        const light = new Light();

        const collider = new Collider("collision1-1.png", imgs.bg, imgs.score, scoreboard, light, this);
        this.playing = false;
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            light.resetTimeout();
            indie.vel.set(0, 0);
            ctx.drawImage(images.score, 10, 260, 620, 130);
            this_.ctx = ctx;
            function render() {                
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, 640, 250);
                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);
                indie.draw(ctx, camera);
                console.log(light.alpha);
                if (light.alpha > 0) {
                    ctx.fillStyle = "rgba(0,0,0," + light.alpha + ")";
                    ctx.fillRect(0, 0, 640, 250);
                }
                if (light.alpha > 0.85) {
                    this_.end();
                }
                if (scoreboard.needsUpdate) {
                    ctx.drawImage(images.score, 10, 260, 620, 130);
                    scoreboard.needsUpdate = false;
                }
                if (this_.playing) {
                    requestAnimationFrame(render);
                }
            }

            function update() {
                if (this_.playing) {
                    indie.update(collider, camera);
                }
            };
            setInterval(update, 15);
            render();
        }
    }
    start(images, ctx, canvas) {
        this.playing = true;
        this.play(images, ctx, canvas);
    }
    end() {
        this.playing = false;
        let ctx = this.ctx;

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