function beetween(val, start, end) {
    return (val > start && val < end);
}
let map, sb, light, game;
export default class Collider {
    constructor(imgsrc, m, s, u, l,g) {
        this.update = u;
        map = m;
        sb = s;
        light = l;
        game = g;
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
        this.flags = {
            torches: [true, true, true],
            whip: true,
            cross: true
        }
        this.torchpos = [{
                x: 550,
                y: 610
            },
            {
                x: 263,
                y: 98
            },
            {
                x: 1785,
                y: 675
            }
        ]
    }
    check(positions) {
        let vert = false;
        let hori = false;
        let rope = false;
        let collected = false;
        if (this.flags.whip) {
            if (beetween(positions.center.y, 675, 690)) {
                if (beetween(positions.center.x, 450, 470)) {
                    collected = "whip";
                    map.getContext("2d").fillStyle = "black";
                    map.getContext("2d").fillRect(450, 675, 20, 20)

                    this.flags.whip = false;
                }
            }
        }
        if (this.flags.cross) {
            if (beetween(positions.center.y, 435, 455)) {
                if (beetween(positions.center.x, 880, 900)) {
                    collected = "cross";
                    let sbctx = sb.getContext("2d");
                    sbctx.fillStyle = "black";
                    sbctx.drawImage(map, 435, 455, 20, 20, 175, 25, 25, 25)

                    map.getContext("2d").fillStyle = "black";
                    map.getContext("2d").fillRect(435, 455, 20, 20)
                    console.log(collected);
                    this.flags.cross = false;
                    this.update.needsUpdate = true;

                }
            }
        }
        this.flags.torches.forEach((flag, i) => {
            if (flag) {
                if (beetween(positions.center.y, this.torchpos[i].y, this.torchpos[i].y + 20)) {
                    if (beetween(positions.center.x, this.torchpos[i].x, this.torchpos[i].x + 20)) {
                        collected = "torch";
                        let sbctx = sb.getContext("2d");
                        sbctx.fillStyle = "black";
                        sbctx.fillRect(135, 25, 20, 20);
                        sbctx.drawImage(map, this.torchpos[i].x, this.torchpos[i].y, 20, 20, 135, 25, 25, 25)
                        map.getContext("2d").fillStyle = "black";
                        map.getContext("2d").fillRect(this.torchpos[i].x, this.torchpos[i].y, 20, 20)
                        this.flags.torches[i] = false;
                        this.update.needsUpdate = true;
                        light.resetTimeout();
                    }
                }
            }
        })


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
                if (color === "255 0 0 255") {
                    game.end();
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
                if (color === "237 119 15 255") {
                    hori = true;
                    break;
                }
                if (color === "255 0 0 255") {
                    game.end();
                    break;
                }

            }
        }
        return {
            x: hori,
            y: vert,
            rope: rope,
            collected: collected
        }
    }
}