import {
    Vec2
} from "./math";

export default class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(2115 - 320, 709 - 125);
    }
    focus(pos, dir) {
        if (dir.x > 0) {
            if(pos.x - this.pos.x >= 200) this.pos.x = pos.x - 200;
        } else if (dir.x < 0){
            if(pos.x - this.pos.x <= 100) this.pos.x = pos.x - 100;
        }        
        this.pos.y = pos.y - 25;
    }
    check() {
        if (this.pos.x > this.size.x) this.pos.x = this.size.x;
        if (this.pos.y > this.size.y) this.pos.y = this.size.y;
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = 0;
    }
}