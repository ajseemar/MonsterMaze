const Entity = require('./entity');

class Sprite extends Entity {
    constructor(sprite, size) {
        super(size);
        this.sprite = sprite;
        this.aspectRatio = size.w / size.h;
        // console.log(this.sprite);
        // console.log(this.sprite.width, this.sprite.height);
        // this.sprite.width = this.size.width / this.aspectRatio;
        // this.sprite.height = this.size.height / this.aspectRatio;
        // debugger
        // console.log(this.sprite.width, this.sprite.height);
    }

    handleRotation() { }

    resize(size) {
        // this.aspectRatio = size.h / size.w * 0.75;
        // console.log(this.sprite);
        // console.log(this.sprite.width, this.sprite.height);
        // this.sprite.width = this.size.width / this.aspectRatio;
        // this.sprite.height = this.size.height / this.aspectRatio;

        this.radius = size.w > size.h ? size.h / 2.5 : size.w / 2.5;
    }
}

module.exports = Sprite;