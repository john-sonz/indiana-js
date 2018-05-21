import Entity from "./Entity";
import SpriteSet from "./SpriteSet.js"
export function createIndie(image) {
    const indie = new Entity();
    indie.pos.set(50,50);
    const sprites = new SpriteSet(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);

    indie.update = function(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    indie.draw = function(ctx){
        sprites.draw("idle", ctx, this.pos.x, this.pos.y);
    }
    console.log(indie);
    return indie;
}