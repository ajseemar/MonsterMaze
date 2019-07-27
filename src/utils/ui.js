class UIManager {
    constructor(player) {
        this.player = player;
    }

    render(ctx) {
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

        // render keys
        Object.keys(this.player.keys).forEach(key => {
            if (this.player.keys[key]) {
                key.render(ctx);
            } else {
                Key.render(ctx);
            }
        });
    }
}

module.exports = UIManager;