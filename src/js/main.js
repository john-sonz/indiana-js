import {
    loadImage
} from "./loaders.js";
import Game from "./Game.js"
import SpriteSet from "./SpriteSet.js";

const IMAGES = ["logo.png", "mapa.png", "sprites.png", "scoreboard.jpg", "collision1-1.png"];

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const imgs = [];
    IMAGES.forEach(url => {
        imgs.push(loadImage(url));
    });
    Promise.all(imgs).then(([logo, map, spriteSheet, scoreboard, coll]) => {
        ctx.drawImage(logo, 120, 30, 400, 126);
        ctx.font = "40px Cousine, monospace";
        ctx.textAlign = "center";
        let text = false;
        let start = false;

        function startScreen() {
            if (text) {
                ctx.fillStyle = "#d0dc71";
                ctx.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height * 0.65);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
            if (!start) {
                requestAnimationFrame(startScreen);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
        };
        setInterval(() => text = !text, 1000);
        let ts = requestAnimationFrame(startScreen);
        const game = new Game(spriteSheet);
        const gameImgs = {
            bg: coll,
            score: scoreboard
        }
        
        window.addEventListener("keydown", e => {
            if (e.key == "Enter") {
                start = true;
                cancelAnimationFrame(ts)
                game.start(gameImgs, ctx, canvas);
            }
        });
    });
});