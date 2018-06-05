function beetween(val, start, end) {
    return (val > start && val < end);
}
let map, sb, light, game, rocks;
export default class Collider {
    constructor(imgsrc, m, s, l, g, r) {
        rocks = r;
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

        rocks.forEach(rock => {
            if (!rock.collided) {                
                if (beetween(rock.pos.x, positions.center.x - 12, positions.center.x + 12)) {
                    if (beetween(rock.pos.y, positions.center.y - 20, positions.center.y + 20)) {
                        rock.collided = true;
                        sb.takeHp();
                    }
                }
            }
        });

        if (this.flags.whip) {
            if (beetween(positions.center.y, 675, 690)) {
                if (beetween(positions.center.x, 450, 470)) {
                    collected = "whip";
                    map.getContext("2d").fillStyle = "black";
                    map.getContext("2d").fillRect(450, 675, 20, 20)
                    sb.setWhips(5);
                    this.flags.whip = false;
                }
            }
        }
        if (this.flags.cross) {
            if (beetween(positions.center.y, 435, 455)) {
                if (beetween(positions.center.x, 880, 900)) {
                    collected = "cross";
                    sb.addCross(map)
                    map.getContext("2d").fillStyle = "black";
                    map.getContext("2d").fillRect(880, 435, 20, 20)
                    console.log(collected);
                    this.flags.cross = false;

                }
            }
        }
        this.flags.torches.forEach((flag, i) => {
            if (flag) {
                if (beetween(positions.center.y, this.torchpos[i].y, this.torchpos[i].y + 20)) {
                    if (beetween(positions.center.x, this.torchpos[i].x, this.torchpos[i].x + 20)) {
                        collected = "torch";
                        sb.addTorch(map, this.torchpos[i]);
                        map.getContext("2d").fillStyle = "black";
                        map.getContext("2d").fillRect(this.torchpos[i].x, this.torchpos[i].y, 20, 20)
                        this.flags.torches[i] = false;
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
                    game.end(false);
                    break;
                }
                if (color === "0 255 0 255") {
                    console.log(this.flags.cross);
                    if (!this.flags.cross) game.end(true);
                    else {
                        vert = true;
                    }
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
                    game.end(false);
                    break;
                }
                if (color === "0 255 0 255") {
                    console.log(this.flags.cross);
                    if (!this.flags.cross) game.end(true);
                    else {
                        hori = true;
                    }
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