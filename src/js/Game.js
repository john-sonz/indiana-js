import {
    createIndie
} from "./entities.js";
import Camera from "./Camera.js";
import Collider from "./Collider.js";
import Light from "./Light.js";
import Scoreboard from "./Scoreboard.js";
import Rock from "./Rocks.js";


export default class Game {
    constructor(spriteSheet, imgs) {
        const indie = createIndie(spriteSheet);
        window.indie = indie;
        const gravity = 0.3;
        const camera = new Camera();

        const scoreboard = new Scoreboard(imgs.score);
        scoreboard.setWhips(0);
        const light = new Light();
        const rocks = [new Rock(400, 660, 40, 1), new Rock(350, 440, 110)]
        const collider = new Collider("collision1-1.png", imgs.bg, scoreboard, light, this, rocks);
        this.playing = false;
        this.play = function (images, ctx, canvas) {
            const this_ = this;
            light.resetTimeout();
            indie.vel.set(0, 0);
            ctx.drawImage(images.score, 10, 260, 620, 130);
            this_.ctx = ctx;
            setInterval(function () {
                rocks.forEach(rock => {
                    rock.update();
                });
            }, 32);
            camera.focus(indie.pos, 1);

            function render() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, 640, 250);
                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);
                indie.draw(ctx, camera);
                rocks.forEach(rock => {
                    rock.draw(ctx, imgs.rock, camera);
                });

                if (light.alpha > 0) {
                    ctx.fillStyle = "rgba(0,0,0," + light.alpha + ")";
                    ctx.fillRect(0, 0, 640, 250);
                }
                if (light.alpha > 0.85 || scoreboard.hp <= 0) {
                    this_.end(false);
                }
                if (scoreboard.needsUpdate) {
                    scoreboard.draw(ctx);
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
    end(win) {
        this.playing = false;
        let ctx = this.ctx;
        let msg = win ? "CONGRATULATIONS! YOU WIN!" : "YOU LOST"

        function endScreen() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 640, 400);
            ctx.fillStyle = "#d0dc71";
            ctx.fillText(msg, 640 / 2, 400 * 0.65);
            requestAnimationFrame(endScreen)
        }
        endScreen();
    }

}