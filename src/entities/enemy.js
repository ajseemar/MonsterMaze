const { index } = require('../utils/utils');
const Sprite = require('./sprite');
const A_Star = require('../maze/solver/a_star');

class Enemy extends Sprite {
    constructor(sprite, size, cells, end) {
        super(sprite, size);
        this.cellCount = Math.sqrt(cells.length);
        const row = Math.floor(Math.random() * this.cellCount);
        const col = Math.floor(Math.random() * this.cellCount);

        this.position = {
            x: col * size.w + size.w / 2,
            y: row * size.h + size.h / 2
        }

        let start = cells[index(row, col, this.cellCount)];
        // debugger
        this.solver = new A_Star(start, end);
        this.cells = cells;
    }

    updateSolver(end) {
        let row = Math.floor(this.position.y / this.size.h);
        let col = Math.floor(this.position.x / this.size.w);
        let start = this.cells[index(row, col, this.cellCount)];
        this.solver.updateSolver(start, end);
    }

    update() {
        this.solver.update();
    }

    render(ctx, offsetX, offsetY) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.angle);
        ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        ctx.restore();

        // if (this.solver.finished) this.solver.render(ctx);
        this.solver.render(ctx);
    }
}

module.exports = Enemy;