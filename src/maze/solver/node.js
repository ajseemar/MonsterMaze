const Vector = require('../../utils/vector');

class Node {
    constructor(i, j, size) {
        this.position = new Vector((j * size.w) + (size.w / 2), (i * size.h) + (size.h / 2));

        // fix to empty
        this.neighbors = {
            "north": Infinity,
            "east": Infinity,
            "south": Infinity,
            "west": Infinity
        };
        this.size = 2;
        this.visited = false;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#72af66';
        ctx.fill();
    }
}

module.exports = Node;