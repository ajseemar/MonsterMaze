const { heuristic, index } = require('../../utils/utils');
const Path = require('./path');
const Node = require('./node');

class A_Star {
    constructor(start, end, cells) {
        // this.cells = cells;
        // this.cells.forEach(cell => cell.node = Object.assign({}, cell.node));
        // this.createNodes();
        this.cellCount = Math.sqrt(cells.length);
        // this.nodes = nodes;
        this.start = start;
        this.end = end;
        // console.log(this.start, this.end);
        // debugger
        this.openSet = [this.start];
        this.closedSet = [];
        this.path = new Path();

        this.initialTime = Date.now();
        // debugger
    }

    createNodes() {
        this.cells.forEach(cell => cell.node = new Node(cell.row, cell.col, cell.size));
    }

    // updateSolver(end) {
    //     let row = Math.floor(this.position.y / this.size.h);
    //     let col = Math.floor(this.position.x / this.size.w);
    //     let start = this.cells[index(row, col, this.cellCount)];
    //     this.solver.updateSolver(start, end);
    // }

    updateSolver(startIdx, endIdx) {
        // debugger
        // this.cells.forEach(cell => {
        //     cell.node.f = 0;
        //     cell.node.g = 0;
        //     cell.node.h = 0;
        //     cell.node.visited = false;
        //     // cell.node.position = Object.assign(cell.node.position);
        // });
        // this.createNodes();

        // this.enemy.updateSolver(end);
        this.start = startIdx;
        this.end = endIdx;
        // this.start = this.cells[startIdx];
        // this.end = this.cells[endIdx];
        this.openSet.push(this.start);
        this.closedSet = [];
        this.finished = false;
        this.path.clear();
        this.initialTime = Date.now();
        // debugger
    }

    // updateSolver(start, end) {
    //     this.start = start;
    //     this.end = end;
    //     this.openSet.push(this.start);
    //     this.closedSet = [];
    //     this.finished = false;
    //     this.path.clear();
    //     this.initialTime = Date.now();
    // }

    update() {
        if (this.openSet.length > 0) {
            // console.log(this.openSet);
            let winner = 0;
            this.openSet.forEach((cell, idx) => {
                if (!cell) { console.log(this.openSet) }
                if (cell.node.f < this.openSet[winner].node.f) winner = idx;
            });

            const current = this.openSet[winner];
            if (current === this.end) {
                console.log(`${(Date.now() - this.initialTime) / 1000.0} seconds`)
                let temp = current.node;
                this.path.addNode(temp);
                while (temp.parent) {
                    this.path.addNode(temp.parent);
                    temp = temp.parent;
                }
                this.finished = true;
                this.openSet = [];
                // console.log('done');
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
            // const neighbors = current.neighbors.filter(obj => !Object.keys(current.walls)
            //     .includes(Object.keys(obj)[0]))
            const neighbors = current.neighbors.filter(obj => Object.keys(current.node.neighbors)
                .includes(Object.keys(obj)[0]))
                .map(obj => Object.values(obj)[0]);
            neighbors.forEach(neighbor => {
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
            // console.log('solving...')
        }
    }

    render(ctx) {
        // if (!this.finished) return;
        this.path.render(ctx);
    }
}

module.exports = A_Star;