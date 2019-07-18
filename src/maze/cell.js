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
        };
    }

    resize() {
        Object.keys(this.walls).forEach(dir => {
            switch (dir) {
                case "north":
                    this.walls[dir].p1.x = this.col * this.size.w;
                    this.walls[dir].p1.y = this.row * this.size.h;
                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w
                    this.walls[dir].p2.y = this.row * this.size.h;
                    break;
                case "east":
                    this.walls[dir].p1.x = (this.col * this.size.w) + this.size.w;
                    this.walls[dir].p1.y = this.row * this.size.h;
                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w
                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;
                    break;
                case "south":
                    this.walls[dir].p1.x = (this.col * this.size.w);
                    this.walls[dir].p1.y = (this.row * this.size.h) + this.size.h;
                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w
                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;
                    break;
                case "west":
                    this.walls[dir].p1.x = (this.col * this.size.w);
                    this.walls[dir].p1.y = (this.row * this.size.h);
                    this.walls[dir].p2.x = (this.col * this.size.w);
                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;
                    break;
                default:
                    break;
            }
            this.node.size = this.size;
            this.node.resize();
        });
    }

    render(ctx, color, offsetX, offsetY) {
        // DEBUG
        if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(this.col * this.size.w, this.row * this.size.h, this.size.w, this.size.h);
        }
        else {
            ctx.strokeStyle = "#53A1F3";
            Object.values(this.walls).forEach(({ p1, p2 }) => {
                ctx.beginPath();
                ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
                ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
                ctx.closePath();
                ctx.stroke();
            });
        }

        // OFFICIAL 
        // Object.values(this.walls).forEach(({ p1, p2 }) => {
        //     ctx.beginPath();
        //     ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
        //     ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
        //     ctx.closePath();
        //     ctx.stroke();
        // });
    }
}

module.exports = Cell;