import Entity from "./Entity";
import SpriteSet from "./SpriteSet.js"
import Keyboard from "./Keyboard.js";
import {
    Vec2
} from "./math";
export function createIndie(image) {
    const indie = new Entity();
    indie.pos.set(50, 330);
    indie.speed = 2;
    indie.size = new Vec2(15, 25);
    const sprites = new SpriteSet(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);
    const input = new Keyboard();
    input.listenTo(window);
    const gravity = 3;
    indie.getCollisionPoints = function () {
        return {
            y: [
                new Vec2(this.pos.x + this.size.x / 6 * 5, this.pos.y + this.size.y),
                new Vec2(this.pos.x + this.size.x / 6, this.pos.y + this.size.y),
                new Vec2(this.pos.x + this.size.x / 6 * 5, this.pos.y),
                new Vec2(this.pos.x + this.size.x / 6, this.pos.y)               

            ],
            x: [
                new Vec2(this.pos.x, this.pos.y + this.size.y / 6 * 5),                
                new Vec2(this.pos.x, this.pos.y + this.size.y / 6),
                new Vec2(this.pos.x + this.size.x, this.pos.y + this.size.y / 6 * 5),                
                new Vec2(this.pos.x + this.size.x, this.pos.y + this.size.y / 6),
            ]
        }
    }
    indie.update = function (collider) {
        this.vel.x = (-input.keyStates.get("KeyA") + input.keyStates.get("KeyD")) * this.speed;
        this.vel.y = (-input.keyStates.get("KeyW") + input.keyStates.get("KeyS")) * 5;
        this.vel.y += 0.5;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < gravity) this.pos.y = gravity;
        if (this.pos.x > 2115 - indie.size.x) this.pos.x = 2115 - indie.size.x;
        if (this.pos.y > 709 - indie.size.y) indie.pos.y = 709 - indie.size.y;
        const collision = collider.check(this.getCollisionPoints());
        if (collision.x) this.pos.x -= this.vel.x;
        if (collision.y) this.pos.y -= this.vel.y;
        else{
            this.pos.y += gravity;
        }


    }
    indie.draw = function (ctx, camera) {
        camera.focus(this.pos, {
            x: parseInt(this.vel.x / this.speed),
            y: parseInt(this.vel.y / this.speed)
        });
        camera.check();
        sprites.draw("idle", ctx, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2);
        const p = this.getCollisionPoints();
        [...p.x, ...p.y].forEach(pos => {
            ctx.beginPath();
            ctx.arc((pos.x - camera.pos.x) * 2, (pos.y - camera.pos.y) * 2, 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();
        });
    }
    return indie;
}