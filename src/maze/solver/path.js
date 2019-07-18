class Path {
    constructor(points) {
        this.points = points || [];
        this.radius = 20;
    }

    addPoint(point) {
        this.points.unshift(point);
    }

    getStart() {
        return this.points[0];
    }

    getEnd() {
        return this.points[this.points.length - 1];
    }

    render(ctx) {
        let current, next;
        // debugger
        for (let i = 0; i < this.points.length - 1; i++) {
            ctx.strokeStyle = "#f00";
            ctx.strokeWidth = 2;
            current = this.points[i];
            next = this.points[i + 1];
            ctx.beginPath();
            ctx.moveTo(current.x, current.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

module.exports = Path;