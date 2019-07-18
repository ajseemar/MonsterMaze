class Entity {
    constructor(size) {
        // this.sprite = sprite;
        // this.size = size / 3;

        this.position = {
            x: 0,
            y: 0
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.size = size;
        this.angle = 0;
        this.speed = 0;
        this.radius = size.w > size.h ? size.h / 2 : size.w / 2;
    }
}

module.exports = Entity;