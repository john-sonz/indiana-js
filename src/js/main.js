import {
    loadImage
} from "./loaders.js";
import Game from "./Game.js"
import SpriteSet from "./SpriteSet.js";



const map = document.createElement("canvas");
const scoreboard = document.createElement("canvas");
const IMAGES = ["logo.png", "mapa.png", "sprites.png", "scoreboard.jpg", "collision1-1.png", "rock.png"];

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const imgs = [];
    IMAGES.forEach(url => {
        imgs.push(loadImage(url));
    });
    Promise.all(imgs).then(([logo, m, spriteSheet, scbrd, coll, rock]) => {
        map.width = 2115;
        map.height = 709;
        map.getContext("2d").drawImage(m, 0, 0, 2115, 709);
        scoreboard.width = 269;
        scoreboard.height = 57;
        scoreboard.getContext("2d").drawImage(scbrd, 0, 0, 269, 57);

        ctx.drawImage(logo, 120, 30, 400, 126);
        ctx.font = "40px Cousine, monospace";
        ctx.textAlign = "center";
        let text = false;
        let start = false;
        let ts;

        function startScreen() {
            if (text) {
                ctx.fillStyle = "#d0dc71";
                ctx.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height * 0.65);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
            if (!start) {
                ts = requestAnimationFrame(startScreen);
            } else {
                cancelAnimationFrame(ts);

            }
        };
        setInterval(() => text = !text, 1000);
        ts = requestAnimationFrame(startScreen);
        const gameImgs = {
            bg: map,
            score: scoreboard,
            rock : rock
        }
        const game = new Game(spriteSheet, gameImgs);


        window.addEventListener("keydown", e => {
            let start = false
            if (e.key == "Enter" && !start) {
                start = true;
                cancelAnimationFrame(ts);
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                game.start(gameImgs, ctx, canvas);
                start = true;
            }
        });
    });
});