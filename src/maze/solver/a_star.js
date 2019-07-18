const { heuristic } = require('../../utils/utils');
const Vector = require('../../utils/vector');
const Path = require('./path');

class A_Star {
    constructor(grid) {
        this.grid = grid;
        this.cells = grid.cells;
        this.start = this.cells[0];
        this.end = this.cells[this.cells.length - 1];
        console.log(this.start, this.end);

        this.openSet = [this.start];
        this.closedSet = [];
        this.path = new Path();
        this.initialTime = Date.now();
    }

    update() {
        if (this.openSet.length > 0) {
            let winner = 0;
            this.openSet.forEach((cell, idx) => {
                // debugger
                if (cell.node.f < this.openSet[winner].node.f) winner = idx;
                // debugger
            });

            const current = this.openSet[winner];
            // this.path = [];
            if (current === this.end) {
                console.log(`${(Date.now() - this.initialTime) / 1000.0} seconds`)
                let temp = current.node;
                this.path.addPoint(new Vector(temp.position.x, temp.position.y));
                while (temp.parent) {
                    this.path.addPoint(new Vector(temp.parent.position.x, temp.parent.position.y));
                    // this.path.push(temp.parent);
                    temp = temp.parent;
                }
                // this.path.push(temp);
                // while (temp.parent) {
                //     this.path.push(temp.parent);
                //     temp = temp.parent;
                // }
                console.log('DONE');
                this.finished = true;
                this.openSet = [];
                return;
            }
            // remove current from open set
            for (let i = this.openSet.length - 1; i >= 0; i--) {
                if (this.openSet[i] === current) {
                    this.openSet.splice(i, 1);
                    break;
                }
            }
            // add current to closed set 
            // debugger
            const neighbors = current.neighbors.filter(obj => !Object.keys(current.walls)
                .includes(Object.keys(obj)[0]))
                .map(obj => Object.values(obj)[0]);
            // debugger
            // console.log(neighbors);
            neighbors.forEach(neighbor => {
                // if (!this.closedSet.includes(neighbor)) {
                if (!neighbor.node.visited) {
                    const tentativeG = current.node.g + 1;
                    let newPath = false;
                    if (this.openSet.includes(neighbor) && tentativeG < neighbor.node.g) {
                        neighbor.node.g = tentativeG;
                        newPath = true;
                        neighbor.node.visited = true;
                    } else {
                        neighbor.node.g = tentativeG;
                        this.openSet.push(neighbor);
                        newPath = true;
                    }

                    if (newPath) {
                        neighbor.node.h = heuristic(neighbor.node, this.end.node);
                        neighbor.node.f = neighbor.node.g + neighbor.node.h;
                        neighbor.node.parent = current.node;
                    }
                }
            });
            current.node.visited = true;
            this.closedSet.push(current);
            // debugger
            console.log('solving...');
        }
    }

    render(ctx) {
        // if (!this.finished) {
        //     this.openSet.forEach(cell => cell.render(ctx, '#0f0', 0, 0));
        //     this.closedSet.forEach(cell => cell.render(ctx, '#f00', 0, 0));
        // }
        if (!this.finished) return;
        // this.path.forEach(node => {
        //     // node.render();
        //     ctx.strokeStyle = "#0f0";
        //     ctx.beginPath();
        //     if (node.parent)
        //         ctx.moveTo(node.parent.position.x, node.parent.position.y);
        //     else
        //         ctx.moveTo(node.position.x, node.position.y);
        //     ctx.lineTo(node.position.x, node.position.y);
        //     ctx.closePath();
        //     ctx.stroke();
        // });
        this.path.render(ctx);
        // this.cells.forEach(cell => cell.node.render());
    }
}

module.exports = A_Star;