export default class SpriteSet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.sprites = new Map();
    }
    define(name, x, y, width, height) {
        const buffer = document.createElement("canvas");
        buffer.width = width;
        buffer.height = height;
        buffer.getContext("2d").drawImage(
            this.image,
            x, y,
            width, height,
            0, 0,
            width, height
        )
        this.sprites.set(name, buffer);
    }
    draw(name, context, x, y) {
        const buffer = this.sprites.get(name)
        context.drawImage(buffer, x, y);
    }
}