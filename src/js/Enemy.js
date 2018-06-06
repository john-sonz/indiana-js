import {
    Vec2
} from "./math";
import SpriteSet from "./SpriteSet";
import Bullet from "./Bullet";

let sprite;
export function setEnemySprite(img) {
    sprite = new SpriteSet(img, 30, 50);
    sprite.define("idle", 0, 0, 30, 50)
}

export default class Enemy {
    constructor(x = 0, y = 0, shootDir) {
        this.pos = new Vec2(x, y);
        this.size = new Vec2(30, 50);
        this.dir = shootDir;
        this.bullet = new Bullet(x + (shootDir == -1 ? 5 : 10), y + 10, shootDir, 2);
    }
    getBullet() {
        return this.bullet
    }
    draw(ctx, camera) {
        if (((this.pos.y - camera.pos.y) * 2) < 200) {            
            sprite.draw("idle", ctx, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2, this.dir == -1);
        }
    }
}