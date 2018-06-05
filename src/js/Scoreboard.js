export default class Scoreboard {
    constructor(img) {
        this.needsUpdate = true;
        this.img = img;
        this.hp = 100;
        this.whips = 0;
    }
    draw(ctx) {
        ctx.drawImage(this.img, 10, 260, 620, 130);
    }
    addTorch(map, torchpos) {
        let sbctx = this.img.getContext("2d");
        sbctx.fillStyle = "black";
        sbctx.fillRect(135, 25, 20, 20);
        sbctx.drawImage(map, torchpos.x, torchpos.y, 20, 20, 135, 25, 25, 25)
        this.needsUpdate = true;
    }
    addCross(map) {
        let sbctx = this.img.getContext("2d");
        sbctx.fillStyle = "black";
        sbctx.drawImage(map, 880, 435, 18, 18, 175, 25, 25, 25);
        this.needsUpdate = true;
    }
    takeHp() {
        this.hp -= 20;
        const ctx = this.img.getContext("2d");
        const offset = (this.hp / 100) * 44;
        ctx.fillStyle = "black";
        ctx.fillRect(56 + offset, 44, 44 - offset, 6)
        this.needsUpdate = true;
    }
    setWhips(n) {
        this.whips = n;
        const ctx = this.img.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(113, 36, 7, 14);
        ctx.fillStyle = "white";
        ctx.font = "13px Cousine, monospace";
        ctx.fillText(n.toString(), 114, 48, 6);
        this.needsUpdate = true;
    }
}