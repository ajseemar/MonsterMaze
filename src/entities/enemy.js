const { index } = require('../utils/utils');
const Sprite = require('./sprite');
const A_Star = require('../maze/solver/a_star');
const Cell = require('../maze/cell');

class Enemy extends Sprite {
    constructor(sprite, size, cells, end) {
        super(sprite, size);
        this.cellCount = Math.sqrt(cells.length);
        const row = Math.floor(Math.random() * this.cellCount);
        const col = Math.floor(Math.random() * this.cellCount);

        this.position = {
            x: col * size.w + this.sprite.width / 2,
            y: row * size.h + this.sprite.height / 2
        }

        let solverCells = cells.map(cell => new Cell(cell.row, cell.col, cell.size));
        let start = solverCells[index(row, col, this.cellCount)];
        // debugger
        this.solver = new A_Star(start, end, cells);
        this.cells = cells;
    }

    updateSolver(endIdx) {
        let row = Math.floor(this.position.y / this.size.h);
        let col = Math.floor(this.position.x / this.size.w);
        let start = this.cells[index(row, col, this.cellCount)];

        // this.solver.start = start;
        // this.solver.end = end;
        // this.solver.openSet.push(this.solver.start);
        // this.solver.closedSet = [];
        // this.solver.finished = false;
        // this.solver.path.clear();
        // this.solver.initialTime = Date.now();

        // this.solver.updateSolver(start, end);
        this.solver.updateSolver(start, endIdx);
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