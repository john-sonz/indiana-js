export default class Collider {
    constructor(imgsrc) {
        this.collisionMap = document.createElement("canvas");
        const img = new Image();
        img.src = "images/" + imgsrc;
        this.collisionMap.width = img.width;
        this.collisionMap.height = img.height;
        console.log(this.collisionMap.width, this.collisionMap.height);
        this.collisionMap.getContext("2d").drawImage(
            img,
            0, 0,
            this.collisionMap.width, this.collisionMap.height);
        this.context = this.collisionMap.getContext("2d");
    }
    check(positions) {
        let vert = false;
        let hori = false;
        let rope = false;
        for (const pos of positions.y) {
            let p = this.context.getImageData(parseInt(pos.x), parseInt(pos.y), 1, 1).data;
            const color = p[0] + " " + p[1] + " " + p[2] + " " + p[3];
            if (p[3] === 255) {
                if (color === "255 255 255 255") {
                    return {
                        x: hori,
                        y: vert,
                        rope: true
                    };

                }
                if (color === "0 0 0 255") {
                    vert = true;
                    break;
                }
                if (color === "237 119 15 255") {
                    vert = true;
                    break;
                }
            }

        }
        for (const pos of positions.x) {
            let p = this.context.getImageData(pos.x, pos.y, 1, 1).data;
            const color = p[0] + " " + p[1] + " " + p[2] + " " + p[3];
            if (p[3] === 255) {

                if (color === "255 255 255 255") {
                    return {
                        x: hori,
                        y: vert,
                        rope: true
                    };

                }
                if (color === "0 0 0 255") {
                    hori = true;
                    break;
                }

            }
        }
        return {
            x: hori,
            y: vert,
            rope: rope
        }
    }
}