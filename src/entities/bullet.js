const uuid = require('uuid');
const Sprite = require('./sprite');
const Entity = require('./entity');
const Vector = require('../utils/vector');

class Bullet {
    constructor(sprite, pos, size) {
        // super(size);
        // super(sprite, size)
        this.id = uuid();
        this.sprite = sprite;
        // this.sprite = sprite;
        // debugger
        this.position = pos.copy();
        this.velocity = new Vector();

        // this.velocity = {
        //     x: 0,
        //     y: 0
        // };

        this.radius = 4;

        this.speed = 1000;

        this.collided = false;

        this.prevCollisionLength = 0;

        // Bullet.bullets[this.id] = this;
    }

    updateVelocity(x, y) {
        this.velocity.x = x * this.speed;
        this.velocity.y = y * this.speed;
    }

    hit(entity) {
        const dist = this.position.dist(entity.position);
        if (dist <= this.radius + entity.radius) {
            entity.hit();
            return true;
        }
        return false;
    }

    update(dt) {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }

    render(ctx, offset) {
        // debugger
        ctx.drawImage(Bullet.sprite, this.position.x + offset.x, this.position.y + offset.y);
    }

    static update(bullets, collisionDetector, dt) {
        Object.keys(bullets).forEach(id => {
            bullets[id].update(dt);
            const collided = collisionDetector.detectCollision(bullets[id]);
            if (collided.length > 0) bullets[id].collided = true;
            if (bullets[id].collided) delete bullets[id];
        });
    }

    static render(bullets, ...renderArgs) {
        Object.values(bullets).forEach(bullet => bullet.render(...renderArgs));
    }
}

Bullet.bullets = {};

module.exports = Bullet;