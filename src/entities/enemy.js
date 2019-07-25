const { index } = require('../utils/utils');
const Sprite = require('./sprite');
const A_Star = require('../maze/solver/a_star');
const Cell = require('../maze/cell');
const Vector = require('../utils/vector');

class Enemy extends Sprite {
    constructor(name, sprite, size, cells, endIdx) {
        super(sprite, size);
        this.name = name
        this.cellCount = Math.sqrt(cells.length);
        const row = Math.floor(Math.random() * this.cellCount);
        const col = Math.floor(Math.random() * this.cellCount);

        // this.position = new Vector(col * size.w + this.sprite.width / 2, row * size.h + this.sprite.height / 2);
        this.position.x = col * size.w + this.sprite.width / 2;
        this.position.y = row * size.h + this.sprite.height / 2;

        // let solverCells = cells.map(cell => new Cell(cell.row, cell.col, cell.size));
        let startIdx = index(row, col, this.cellCount);
        // let start = Object.assign(Object.create(Object.getPrototypeOf(cell)), cell);
        // debugger
        // cells = cells.map(cell => Object.assign(Object.create(Object.getPrototypeOf(cell)), cell));
        // debugger
        this.solver = new A_Star(
            startIdx,
            endIdx,
            cells
        );
        // this.cells = cells;
    }

    resize(size) {
        this.aspectRatio = size.h / size.w * 0.75;
        // console.log(this.sprite);
        // console.log(this.sprite.width, this.sprite.height);
        // this.sprite.width = this.size.width / this.aspectRatio;
        // this.sprite.height = this.size.height / this.aspectRatio;
        if (this.solver.finished) this.solver.path.resize();
    }
    updateSolver(endIdx) {
        let row = Math.floor(this.position.y / this.size.h);
        let col = Math.floor(this.position.x / this.size.w);
        // let start = this.cells[index(row, col, this.cellCount)];

        // this.solver.start = start;
        // this.solver.end = end;
        // this.solver.openSet.push(this.solver.start);
        // this.solver.closedSet = [];
        // this.solver.finished = false;
        // this.solver.path.clear();
        // this.solver.initialTime = Date.now();

        // this.solver.updateSolver(start, end);
        // console.log(this.name, this.solver, this.solver.path);
        this.solver.updateSolver(index(row, col, this.cellCount), endIdx);
    }

    handleRotation() {
        // console.log('rotate');
        if (!this.target) return;
        const diff = Vector.sub(this.target, this.position);
        this.angle = diff.getDirection();
    }

    update() {
        this.handleRotation();
        this.solver.update();
    }

    render(ctx, offset) {
        ctx.save();
        ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.sprite, -this.radius, -this.radius);
        // ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        // debugger
        ctx.restore();

        // ctx.fillStyle = "#f0f";
        // ctx.beginPath();
        // ctx.arc(this.position.x + offset.x, this.position.y + offset.y, this.radius, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();

    //     // normal point on path relative to predicted pos
    //     // ctx.fillStyle = "#0ff";
    //     // ctx.beginPath();
    //     // ctx.arc(this.normal.x, this.normal.y, this.radius / 3, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();

    //     // // target point on path boid aims to seek
        // ctx.fillStyle = "#fff";
        // ctx.beginPath();
        // ctx.arc(this.target.x, this.target.y, this.radius / 3, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();

        // if (this.solver.finished) this.solver.render(ctx);
        // this.solver.render(ctx);
    }
}

module.exports = Enemy;