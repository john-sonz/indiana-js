import {
    Vec2
} from "./math";

export default class Bullet {
    constructor(x, y, dir, speed = 2) {
        this.startX = x;
        this.pos = new Vec2(x, y);
        this.range = 150;
        this.dir = dir;
        this.speed = speed;
        this.collided = false;
        this.allowUpdate = true;
    }
    update() {
        if (this.allowUpdate) {
            if (Math.abs(this.startX - this.pos.x) > this.range || this.collided) {
                this.pos.x = this.startX;
                this.allowUpdate = false;
                this.collided = false;
                setTimeout(() => {
                    this.allowUpdate = true;
                }, 2000);
            } else this.pos.x += this.speed * this.dir;
        }

    }
    draw(ctx, camera) {
        if (this.allowUpdate) {
            if (((this.pos.y - camera.pos.y) * 2) < 250) {
                ctx.beginPath();
                ctx.fillStyle = "gold";
                ctx.arc(
                    (this.pos.x - camera.pos.x) * 2,
                    (this.pos.y - camera.pos.y) * 2,
                    3, 0, 2 * Math.PI
                )
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}