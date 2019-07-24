const Vector = require('../utils/vector');

class Entity {
    constructor(size) {
        // this.sprite = sprite;
        // this.size = size / 3;

        this.position = new Vector();

        this.maxSpeed = 0.15;
        this.maxForce = 0.01;
        this.velocity = new Vector(this.maxSpeed, 0);
        this.acceleration = new Vector();

        this.size = size;
        this.angle = 0;
        this.speed = 0;
        this.radius = size.w > size.h ? size.h / 2.5 : size.w / 2.5;
    }

    applyForce(...forces) {
        forces.forEach(force => {
            this.acceleration.add(force);
        });
    }
}

module.exports = Entity;