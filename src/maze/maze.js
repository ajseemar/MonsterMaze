const index = require('../utils/utils');

class Maze {
    constructor(cellCount, cellSize, width, height, grid) {
        this.cellCount = cellCount;
        this.width = cellSize.w * cellCount;
        this.height = cellSize.h * cellCount;
        this.grid = grid;

        this.generateMaze();
    }


    generateMaze() {
        let currentCell = this.grid.cells[0];
        currentCell.visited = true;
        const stack = [currentCell];

        while (stack.length !== 0) {
            let neighbors = currentCell.neighbors.filter(obj => {
                let cell = Object.values(obj)[0];
                if (!cell) return null;
                return !cell.visited;
            });

            let neighborDir;
            let neighbor;

            let neighborObj = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (neighborObj) {
                neighborDir = Object.keys(neighborObj)[0];
                neighbor = neighborObj[neighborDir];
            }

            if (neighborObj === undefined) {
                currentCell = stack.pop();
            }
            else {
                neighbor.visited = true;
                switch (neighborDir) {
                    case "north":
                        delete currentCell.walls["north"];
                        delete neighbor.walls["south"];
                        currentCell.node.walls["north"] = 1;
                        neighbor.node.walls["south"] = 1;
                        break;
                    case "east":
                        delete currentCell.walls["east"];
                        delete neighbor.walls["west"];
                        currentCell.node.walls["east"] = 1;
                        neighbor.node.walls["west"] = 1;
                        break;
                    case "south":
                        delete currentCell.walls["south"];
                        delete neighbor.walls["north"];
                        currentCell.node.walls["south"] = 1;
                        neighbor.node.walls["north"] = 1;
                        break;
                    case "west":
                        delete currentCell.walls["west"];
                        delete neighbor.walls["east"];
                        currentCell.node.walls["west"] = 1;
                        neighbor.node.walls["east"] = 1;
                        break;
                }
                stack.push(neighbor);
                currentCell = neighbor;
            }
        }
    }

    render(ctx) {
        this.grid.render(ctx);
    }
}

module.exports = Maze;