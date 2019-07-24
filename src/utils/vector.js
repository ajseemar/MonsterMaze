class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    // return the angle of the vector in radians
    getDirection() {
        return Math.atan2(this.y, this.x);
    };

    // set the direction of the vector in radians
    setDirection(direction) {
        var magnitude = this.getMagnitude();
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
        return this;
    };

    // get the magnitude of the vector
    getMagnitude() {
        // use pythagoras theorem to work out the magnitude of the vector
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    // set the magnitude of the vector
    setMagnitude(magnitude) {
        var direction = this.getDirection();
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
        return this;
    };

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
        // this.x += vector.x;
        // this.y += vector.y;
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
        // this.x -= vector.x;
        // this.y -= vectory.y;
    }

    static mult(v, scalar) {
        return new Vector(v.x * scalar, v.y * scalar);
        // this.x *= scalar;
        // this.y *= scalar;
    }

    static div(v, scalar) {
        return new Vector(v.x / scalar, v.y / scalar);
        // this.x /= scalar;
        // this.y /= scalar;
    }

    add(vector) {
        // return new Vector(this.x + vector.x, this.y + vector.y);
        // debugger
        if (!vector) debugger;
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector) {
        // return new Vector(this.x - vector.x, this.y - vector.y);
        this.x = vector.x - this.x;
        this.y = vector.y - this.y;
        return this;
    }

    multiply(scalar) {
        // return new Vector(this.x * scalar, this.y * scalar);
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divide(scalar) {
        // return new Vector(this.x / scalar, this.y / scalar);
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    dot(vector) {
        // debugger
        return (this.x * vector.x) + (this.y * vector.y);
    }

    angleBetween(vector, degrees) {
        const step = this.dot(vector) / (this.getMagnitude() * vector.getMagnitude());
        const theta = Math.acos(step);
        if (degrees) return theta * 180 / Math.PI;
        else return theta;
    }

    normalize() {
        const dist = this.getMagnitude();
        return new Vector(this.x / dist, this.y / dist);
    }

    project(vector) {
        const normal = vector.normalize();
        return normal.multiply(this.dot(normal));
    }

    limit(scalar) {
        const limited = this.normalize().multiply(Math.min(this.getMagnitude(), scalar));
        this.x = limited.x;
        this.y = limited.y;
        return this;
    }

    dist(vector) {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    static getNormalPoint(p, a, b) {
        // debugger
        const ap = Vector.sub(p, a);
        const ab = Vector.sub(b, a);

        const abNorm = ab.normalize();
        abNorm.multiply(ap.dot(abNorm));

        return Vector.add(a, abNorm);
    }
}

module.exports = Vector;