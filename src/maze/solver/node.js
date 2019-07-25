const Vector = require('../../utils/vector');

class Node {
    constructor(i, j, size, neighbors, walls) {
        this.i = i;
        this.j = j;
        this.position = new Vector((j * size.w) + (size.w / 2), (i * size.h) + (size.h / 2));

        // fix to empty
        this.neighbors = neighbors || {};
        //     // "north": Infinity,
        //     // "east": Infinity,
        //     // "south": Infinity,
        //     // "west": Infinity
        // };
        this.walls = walls || {};
        // if (neighbors && walls) {
        //     this.neighbors = neighbors.filter(obj => Object.keys(walls)
        //         .includes(Object.keys(obj)[0]))
        //         .map(obj => {
        //             let cell = Object.values(obj)[0];
        //             return new Node(cell.row, cell.col, cell.size)
        //         });
        // } else {
        // this.neighbors = [];
        // this.walls = {};
        // }
        this.size = size;
        this.radius = 2;
        this.visited = false;
    }

    clear() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.visited = false;
        this.parent = null;
    }

    resize() {
        this.position.x = (this.j * this.size.w) + (this.size.w / 2);
        this.position.y = (this.i * this.size.h) + (this.size.h / 2);
    }
}

module.exports = Node;