const Entity = require('./entity');

class Sprite extends Entity {
    constructor(sprite, size) {
        super(size);
        this.sprite = sprite;
        this.aspectRatio = size.w / size.h;
        console.log(this.sprite);
        console.log(this.sprite.width, this.sprite.height);
        this.sprite.width = this.size.width / this.aspectRatio;
        this.sprite.height = this.size.height / this.aspectRatio;
        console.log(this.sprite.width, this.sprite.height);
    }

    resize(size) {
        this.aspectRatio = size.h / size.w * 0.75;
        // console.log(this.sprite);
        // console.log(this.sprite.width, this.sprite.height);
        this.sprite.width = this.size.width / this.aspectRatio;
        this.sprite.height = this.size.height / this.aspectRatio;
    }
}

module.exports = Sprite;