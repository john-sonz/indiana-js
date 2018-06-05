import {
    Vec2
} from "./math";

export default class Rock {
    constructor(x, y, range, speed = 2) {
        this.startY = y;
        this.pos = new Vec2(x, y);
        this.range = range;
        this.speed = speed;
        this.alllowUpdate = true;
        this.collided = false;
    }
    update() {
        if (this.alllowUpdate) {
            if (this.pos.y - this.startY > this.range) {
                this.pos.y = this.startY;
                this.alllowUpdate = false;
                this.collided = false;
                setTimeout(() => {
                    this.alllowUpdate = true
                }, 1000)
            } else this.pos.y = this.pos.y + this.speed;
        }

    }
    draw(ctx, img, camera) {
        if (this.alllowUpdate) {
            if (((this.pos.y - camera.pos.y) * 2) < 250)
                ctx.drawImage(img, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2);
        }
    }
}