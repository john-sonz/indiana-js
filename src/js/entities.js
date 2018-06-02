import Entity from "./Entity";
import SpriteSet from "./SpriteSet.js"
import Keyboard from "./Keyboard.js";
import {
    Vec2
} from "./math";
import {
    specs
} from "./specs.js";

export function createIndie(image) {
    const indie = new Entity();
    indie.pos.set(50, 330);
    indie.speed = 2.5;
    indie.size = new Vec2(15, 25);
    const sprites = new SpriteSet(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);
    sprites.define("jump", 81, 68, 34, 50);
    sprites.defineAnim(specs.run);
    sprites.defineAnim(specs.climb);
    console.log(sprites);
    const input = new Keyboard();
    let ropeMode = false;
    input.listenTo(window);

    input.setListener("KeyW", e => {
        if (ropeMode) {
            return;
        } else if (!indie.jumping && !(input.keyStates.get("KeyA") || input.keyStates.get("KeyD"))) {
            indie.vel.y = -9.5;
            indie.jumping = true;
        }

    });
    input.setListener("KeyE", e => {
        if (!indie.jumping) {
            ropeMode = false;
            indie.vel.y = -9.5;
            indie.vel.x = indie.speed;
            indie.jumping = true;
            indie.update()
        }
    });
    input.setListener("KeyQ", e => {
        if (!indie.jumping) {
            ropeMode = false;
            indie.vel.y = -9.5;
            indie.vel.x = -indie.speed;
            indie.jumping = true;
            indie.update()
        }
    });
    let distance = 0;
    const gravity = 1;
    const resistance = 0.95;
    indie.collisionPoints = {
        y: [
            new Vec2(),
            new Vec2(),
            new Vec2(),
        ],
        x: [
            new Vec2(),
            new Vec2(),
            new Vec2(),
            new Vec2(),
        ]
    };
    indie.updateCollisionPoints = function () {
        this.collisionPoints.y[0].set(this.pos.x + this.size.x / 6 * 5, this.pos.y + this.size.y - 2);
        this.collisionPoints.y[1].set(this.pos.x + this.size.x / 6, this.pos.y + this.size.y - 2);
        this.collisionPoints.y[2].set(this.pos.x + this.size.x / 2, this.pos.y + 2)


        this.collisionPoints.x[0].set(this.pos.x + 2, this.pos.y + this.size.y / 6 * 5);
        this.collisionPoints.x[1].set(this.pos.x + 2, this.pos.y + this.size.y / 6);
        this.collisionPoints.x[2].set(this.pos.x + this.size.x - 2, this.pos.y + this.size.y / 6 * 5);
        this.collisionPoints.x[3].set(this.pos.x + this.size.x - 2, this.pos.y + this.size.y / 6);

    }
    indie.update = function (collider) {
        if (!ropeMode) {
            if (!this.jumping) {
                this.vel.x = (-input.keyStates.get("KeyA") + input.keyStates.get("KeyD")) * this.speed;
            } else {
                this.vel.x *= resistance;
            }
            this.vel.y += gravity;
            if (this.vel.y > 6) {
                this.vel.y = 2;
                this.jumping = true;
            }

        } else {
            this.vel.x = 0;
            this.vel.y = (-input.keyStates.get("KeyW") + input.keyStates.get("KeyS")) * 1.5;

        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < gravity) this.pos.y = gravity;
        if (this.pos.x > 2115 - indie.size.x) this.pos.x = 2115 - indie.size.x;
        if (this.pos.y > 709 - indie.size.y) indie.pos.y = 709 - indie.size.y;

        if (collider) {
            this.updateCollisionPoints();
            const collision = collider.check(this.collisionPoints);
            if (collision.rope) {
                ropeMode = true;
                this.jumping = false;
                this.pos.x += 2 * this.vel.x;
            } else {
                ropeMode = false;
                if (collision.x) {
                    this.pos.x -= this.vel.x;
                } else distance += Math.abs(this.vel.x);
                if (collision.y) {
                    this.pos.y -= this.vel.y;
                    this.jumping = false;
                }
            }
        }

    }
    let lastDir = 0;
    let ropeDistance = 0;
    indie.resolveFrame = function (len) {
        if (ropeMode) {
            if (this.vel.y !== 0) {
                let n = Math.floor((distance / (len * 2)) % specs.climb.frames.length);
                distance += 1.5;
                return "climb" + n;
            }
            return "climb0";

        }
        if (this.jumping) return "jump";
        if (this.vel.x !== 0) {
            let n = Math.floor((distance / len) % specs.run.frames.length);
            return "run" + n;
        }
        return "idle";
    }

    indie.draw = function (ctx, camera) {
        const xDir = this.vel.x !== 0 ? parseInt(this.vel.x / Math.abs(this.vel.x)) : lastDir;
        lastDir = xDir;


        camera.focus(this.pos, {
            x: xDir,
            y: parseInt(this.vel.y)
        });
        camera.check();
        sprites.draw(this.resolveFrame(5), ctx, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2, xDir == -1);
        if (distance > 10000) distance = 0;
    }
    return indie;
}