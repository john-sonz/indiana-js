export default class Scoreboard {
    constructor(img) {
        this.needsUpdate = true;
        this.img = img;
        this.hp = 100;
        this.lives = 6;
        this.whips = 0;
        this.score = 0;
    }
    draw(ctx) {
        ctx.drawImage(this.img, 10, 260, 620, 130);
    }
    addTorch(map, torchpos) {
        let sbctx = this.img.getContext("2d");
        sbctx.fillStyle = "black";
        sbctx.fillRect(135, 25, 20, 20);
        sbctx.drawImage(map, torchpos.x, torchpos.y, 20, 20, 133, 25, 25, 25)
        this.needsUpdate = true;
    }
    addCross(map) {
        let sbctx = this.img.getContext("2d");
        sbctx.fillStyle = "black";
        sbctx.drawImage(map, 880, 435, 18, 18, 173, 25, 25, 25);
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
    takeLive() {
        this.lives -= 1;
        const ctx = this.img.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(35, 43, 7, 7);
        ctx.fillStyle = "green";
        ctx.font = "8px Cousine, monospace";
        ctx.fillText(this.lives.toString(), 37, 49, 7);
        this.needsUpdate = true;
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
    updateScore(n = 0) {
        this.score += n;
        let s = this.score.toString();
        while (s.length < 6){
            s = "0" + s;
                }
        
        const ctx = this.img.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(56, 36, 44, 7);
        ctx.fillStyle = "white";
        ctx.font = "9px Cousine, monospace";
        ctx.fillText(s, 57, 43, 44);
        this.needsUpdate = true;
    }

}