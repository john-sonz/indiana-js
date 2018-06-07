export default class SpriteSet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.sprites = new Map();
    }
    define(name, x, y, width, height) {
        const t = [];
        [false, true].map(reverse => {
            const buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;
            const context = buffer.getContext("2d");
            if (reverse) {
                context.translate(width, 0);
                context.scale(-1, 1);
            }
            context.drawImage(
                this.image,
                x, y,
                width, height,
                0, 0,
                width, height
            )
            t.push(buffer);
        })
        this.sprites.set(name, t);
    }
    defineAnim(spec) {        
        for (let i = 0; i < spec.frames.length; i++) {
            let f = spec.frames[i];
            this.define(spec.name + i, f.pos.x, f.pos.y, f.width, f.height);
        }
    }
    draw(name, context, x, y, reverse = false) {               
        const buffer = this.sprites.get(name)
        context.drawImage(buffer[reverse ? 1 : 0], x, y);
    }
}