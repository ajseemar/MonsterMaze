const Vector = require('../../utils/vector');

class Node {
    constructor(i, j, size) {
        this.i = i;
        this.j = j;
        this.position = new Vector((j * size.w) + (size.w / 2), (i * size.h) + (size.h / 2));

        // fix to empty
        this.neighbors = {
            "north": Infinity,
            "east": Infinity,
            "south": Infinity,
            "west": Infinity
        };
        this.size = size;
        this.radius = 2;
        this.visited = false;
    }

    resize() {
        this.position.x = (this.j * this.size.w) + (this.size.w / 2);
        this.position.y = (this.i * this.size.h) + (this.size.h / 2);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#72af66';
        ctx.fill();
    }
}

module.exports = Node;