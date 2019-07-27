const Key = require('../entities/pickups/key');

class UIManager {
    constructor(player, width, height, cellSize) {
        this.player = player;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
    }

    renderHealthBar(ctx) {
        // render health bar
        ctx.fillStyle = "#c7c7c7";
        ctx.fillRect(75, 40, 1000, 83);

        // gradient color
        const ar = 255;
        const ag = 0;
        const ab = 0;

        const br = 0;
        const bg = 255;
        const bb = 0;

        const ratio = this.player.hp / this.player.hpMax;
        const cr = ar + (br - ar) * ratio;
        const cg = ag + (bg - ag) * ratio;
        const cb = ab + (bb - ab) * ratio;
        ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
        const width = Math.floor(1000 * this.player.hp / this.player.hpMax);
        ctx.fillRect(75, 40, width, 83);
    }

    renderHealthBarHeart(ctx) {
        // render heart
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "#FF0000";
        const d = 50
        const k = 10;
        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.stroke();
        ctx.fill()
        ctx.restore();
    }

    renderKeys(ctx) {
        Object.keys(this.player.keys).forEach((keyCode, idx) => {
            const key = this.player.keys[keyCode];
            if (key) {
                // key.render(ctx);
                ctx.drawImage(key.sprite, 0, 0, key.sprite.width, key.sprite.height, 20, (idx * this.cellSize.h / 4 + 8 * idx) + 130, this.cellSize.w / 2, this.cellSize.h / 4);
            } else {
                // Key.render(ctx);
                ctx.drawImage(Key.default.sprite, 0, 0, Key.default.sprite.width, Key.default.sprite.height, 20, (idx * this.cellSize.h / 4 + 8 * idx) + 130, this.cellSize.w / 2, this.cellSize.h / 4);
                // ctx.drawImage(Key.default.sprite, 0, idx * Key.default.sprite.height + 150);
            }
        });
    }

    render(ctx) {

        this.renderHealthBar(ctx);
        this.renderHealthBarHeart(ctx);
        this.renderKeys(ctx);


        // render keys

    }
}

module.exports = UIManager;