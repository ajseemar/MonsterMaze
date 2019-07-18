const Entity = require('./entity');

class Sprite extends Entity {
    constructor(sprite, size) {
        super(size);
        this.sprite = sprite;
    }
}

module.exports = Sprite;