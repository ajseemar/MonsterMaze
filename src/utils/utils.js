class Utils {
    static index(i, j, rows) {
        return i + (j * rows);
    }

    static clamp(num, min, max) {
        return Math.max(min, Math.min(num, max))
    }

    static heuristic(a, b) {
        const dx = b.position.x - a.position.x;
        const dy = b.position.y - a.position.y;
        return Math.sqrt(dx * dx + dy * dy);
        // return Math.abs(dx) + Math.abs(dy);
    };

    static map(num, x1, y1, x2, y2) {
        return (num - x1) * (y2 - x2) / (y1 - x1) + x2;
    }
}

module.exports = Utils;