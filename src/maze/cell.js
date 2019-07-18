const Node = require('./solver/node');
const Wall = require('./wall');
const Vector = require('../utils/vector');

class Cell {
    constructor(row, col, size) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.visited = false;
        this.node = new Node(row, col, size);
        this.neighbors = [];
        this.walls = {
            "north": new Wall(
                new Vector(this.col * this.size.w, this.row * this.size.h),
                new Vector((this.col * this.size.w) + this.size.w, this.row * this.size.h)
            ),
            "east": new Wall(
                new Vector((this.col * this.size.w) + this.size.w, this.row * this.size.h),
                new Vector((this.col * this.size.w) + this.size.w, (this.row * this.size.h) + this.size.h)
            ),
            "south": new Wall(
                new Vector((this.col * this.size.w), (this.row * this.size.h) + this.size.h),
                new Vector((this.col * this.size.w) + this.size.w, (this.row * this.size.h) + this.size.h)
            ),
            "west": new Wall(
                new Vector(this.col * this.size.w, this.row * this.size.h),
                new Vector(this.col * this.size.w, (this.row * this.size.h) + this.size.h)
            )
        }
        debugger
    }

    render(ctx, offsetX, offsetY) {
        ctx.strokeStyle = "#53A1F3";
        Object.values(this.walls).forEach(({ p1, p2 }) => {
            // debugger
            ctx.beginPath();
            ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
            ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
            ctx.closePath();
            ctx.stroke();
            // debugger
        });

        // this.node.render(ctx);
    }
}

module.exports = Cell;