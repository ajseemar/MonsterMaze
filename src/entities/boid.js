const Enemy = require('./enemy');
const Vector = require('../utils/vector');
const { map } = require('../utils/utils');

class Boid extends Enemy {
    constructor(name, sprite, size, cells, endIdx) {
        super(name, sprite, size, cells, endIdx);
        // this.radius = size.w > size.h ? size.h / 5 : size.w / 5;
        this.perceptionRadius = this.radius * 2;
        // this.target = this.position;
    }

    applyBehaviors(path, boids, playerPos) {
        // const follow = this.follow(path).multiply(2);
        // const flock = new Vector();
        // debugger
        // const flock = this.flock(boids);
        // debugger
        let arrive = new Vector();
        let follow = new Vector();
        const separation = this.separate(boids).multiply(5);
        if (this.position.dist(playerPos) < 5)
            arrive = this.arrive(playerPos).multiply(0.3);
        else follow = this.follow(path, playerPos).multiply(2);
        this.applyForce(follow, separation, arrive);
    }

    seek(target) {
        if (!target) return new Vector();
        let desired = Vector.sub(target, this.position);
        if (desired.getMagnitude() < 0.05) return new Vector();
        desired = desired.normalize().multiply(this.maxSpeed);
        const steering = Vector.sub(desired, this.velocity);
        steering.limit(this.maxForce);
        // this.applyForce(steering);
        // console.log(steering);
        // if (!steering) debugger
        return steering;
    }

    arrive(target) {
        if (!target) return;
        const desired = Vector.sub(target, this.position);
        const d = desired.getMagnitude();

        if (d < this.perceptionRadius) {
            desired.setMagnitude(map(d, 0, this.perceptionRadius, 0, this.maxSpeed));
        } else desired.setMagnitude(this.maxSpeed);
        const steering = Vector.sub(desired, this.velocity).setMagnitude(this.maxForce);
        // this.applyForce(steering);
        return steering;
    }

    follow(path, targetPos) {
        const projection = this.velocity.normalize().multiply(this.perceptionRadius);
        this.predictedPos = Vector.add(this.position, projection);

        // let target = null;
        let winner = Infinity;
        // let winnerIdx = 0

        for (let i = 0; i < path.nodes.length - 1; i++) {
            let a = path.nodes[i].position;
            let b = path.nodes[i + 1].position;


            let normalPoint = Vector.getNormalPoint(this.predictedPos, a, b);



            if (normalPoint.x < Math.min(a.x, b.x) || normalPoint.x > Math.max(a.x, b.x)) normalPoint = a.copy();
            else if (normalPoint.y < Math.min(a.y, b.y) || normalPoint.y > Math.max(a.y, b.y)) normalPoint = a.copy();
            // if (normalPoint.x < Math.min(a.position.x, b.position.x) || normalPoint.x > Math.max(a.position.x, b.position.x)) normalPoint = b.position.copy();
            // else if (normalPoint.y < Math.min(a.position.y, b.position.y) || normalPoint.y > Math.max(a.position.y, b.position.y)) normalPoint = b.position.copy();

            const dist = this.predictedPos.dist(normalPoint);
            if (dist < winner) {
                winner = dist;
                this.normal = normalPoint.copy();
                const dir = Vector.sub(b, a).normalize();
                dir.multiply(this.perceptionRadius);
                this.target = Vector.add(this.normal, dir);
                // if (i === path.nodes.length - 2) this.solver.path.reverse();

                // need to refine this check to make sure targetPos only becomes target if boid's position is a certain distance away from the last node
                if (i === path.nodes.length - 2) this.target = targetPos;
            }

        }
        const desired = this.seek(this.target);
        if (!desired) debugger
        // return desired;
        // this.applyForce(desired);
        if (!this.target) return this.seek(this.position);
        return this.seek(this.target);
    }

    separate(boids) {
        const sum = new Vector();
        let count = 0;
        boids.forEach(boid => {
            const dist = this.position.dist(boid.position);

            if (dist > 0 && dist < this.perceptionRadius) {
                const diff = Vector.sub(this.position, boid.position).normalize();
                sum.add(diff);
                count++;
            }
        });

        if (count > 0) {
            sum.divide(count);
            sum.setMagnitude(this.maxSpeed);
            const steering = Vector.sub(sum, this.velocity);
            steering.limit(this.maxForce);
            // this.applyForce(steering);
            return steering;
        } else return new Vector();
    }

    align(boids) {
        const sum = new Vector();
        let count = 0;
        boids.forEach(boid => {
            const dist = this.position.dist(boid.position);
            if (dist > 0 && dist < this.perceptionRadius * 4) {
                sum.add(boid.velocity);
                count++;
            }
        });
        if (count > 0) {
            sum.divide(count);
            const sumN = sum.normalize();
            sumN.setMagnitude(this.maxSpeed);

            const steering = Vector.sub(sumN, this.velocity);
            steering.limit(this.maxForce);
            return steering;
        } else return new Vector();
    }

    cohesion(boids) {
        const sum = new Vector();
        let count = 0;
        boids.forEach(boid => {
            const dist = this.position.dist(boid.position);
            if (dist > 0 && dist < this.perceptionRadius * 2) {
                sum.add(boid.position);
                count++;
            }
        });
        if (count > 0) {
            sum.divide(count);
            return this.seek(sum);
        } else return new Vector();
    }

    flock(boids) {
        const separation = this.separate(boids).multiply(1.4);
        const alignment = this.align(boids).multiply(1);
        const cohesion = this.cohesion(boids).multiply(0.5);

        const netForce = new Vector()
            .add(separation)
            .add(alignment)
            .add(cohesion);

        return netForce;
    }

    // checkBounds() {
    //     if (this.position.x - this.radius > c.width) this.position.x = -this.radius;
    //     if (this.position.x + this.radius < 0) this.position.x = c.width + this.radius;
    //     if (this.position.y + this.radius > c.height) this.position.y = -this.radius;
    //     if (this.position.y - this.radius < 0) this.position.y = c.height + this.radius;
    // }

    update(dt) {
        this.handleRotation();

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        // this.velocity.add(this.acceleration.multiply(dt));
        // this.position.add(this.velocity.multiply(dt));
        this.acceleration.multiply(0);

        // this.checkBounds();
    }

    // render(ctx) {
    //     // predicted position
    //     // ctx.fillStyle = "#f00";
    //     // ctx.beginPath();
    //     // ctx.arc(this.predictedPos.x, this.predictedPos.y, this.radius / 3, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();

    //     // boid
    //     ctx.fillStyle = "#f0f";
    //     ctx.beginPath();
    //     ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    //     ctx.closePath();
    //     ctx.fill();

    //     // normal point on path relative to predicted pos
    //     // ctx.fillStyle = "#0ff";
    //     // ctx.beginPath();
    //     // ctx.arc(this.normal.x, this.normal.y, this.radius / 3, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();

    //     // // target point on path boid aims to seek
    //     // ctx.fillStyle = "#fff";
    //     // ctx.beginPath();
    //     // ctx.arc(this.target.x, this.target.y, this.radius / 3, 0, 2 * Math.PI);
    //     // ctx.closePath();
    //     // ctx.fill();

    //     this.solver.render(ctx);
    // }
}

module.exports = Boid;