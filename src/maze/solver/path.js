class Path {
    constructor(nodes) {
        this.nodes = nodes || [];
        this.radius = 20;

        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    clear() {
        this.nodes = [];
    }

    reverse() {
        this.nodes.reverse();
    }

    addNode(node) {
        this.nodes.push(node);
    }

    getStart() {
        return this.nodes[0].position;
    }

    getEnd() {
        return this.nodes[this.points.length - 1].position;
    }

    render(ctx) {
        let current, next;
        for (let i = 0; i < this.nodes.length - 1; i++) {
            ctx.strokeStyle = this.color;
            // ctx.strokeStyle = "#f00";
            ctx.strokeWidth = 2;
            current = this.nodes[i];
            next = this.nodes[i + 1];
            ctx.beginPath();
            ctx.moveTo(current.position.x, current.position.y);
            ctx.lineTo(next.position.x, next.position.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

module.exports = Path;