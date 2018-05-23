import Entity from "./Entity";
import SpriteSet from "./SpriteSet.js"
import Keyboard from "./Keyboard.js";
export function createIndie(image) {
    const indie = new Entity();
    indie.pos.set(50, 320);
    indie.speed = 2;
    const sprites = new SpriteSet(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);
    const input = new Keyboard();
    input.listenTo(window);
    indie.update = function () {
        this.vel.x = (-input.keyStates.get("KeyA") + input.keyStates.get("KeyD")) * this.speed;
        this.vel.y = (-input.keyStates.get("KeyW") + input.keyStates.get("KeyS")) * this.speed;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    indie.draw = function (ctx, camera) {
        camera.focus(this.pos, {
            x: parseInt(this.vel.x / this.speed),
            y: parseInt(this.vel.y / this.speed)
        });
        camera.check();
        sprites.draw("idle", ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
        console.log(camera.pos);
    }
    return indie;
}