const Entity = require('./entity');

class Sprite extends Entity {
    constructor(sprite, size) {
        super(size);
        this.sprite = sprite;
        this.aspectRatio = size.w / size.h;
        // this.angle = -45;
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

    render(ctx, offset) {
        ctx.save();
        // ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        ctx.translate(this.position.x + offset.x + this.size.w / 2, this.position.y + offset.y + this.size.h / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, 0, 0, this.sprite.size.w, this.sprite.size.h);
        // ctx.beginPath();
        // // ctx.arc(8, 12, 8, 0, Math.PI * 2);
        // ctx.closePath();
        // ctx.fill();
        ctx.restore();
        // ctx.fillStyle = "#f0f";
        // ctx.fillRect(this.position.x + offset.x + this.size.w / 2, this.position.y + offset.y + this.size.h / 2, 10, 10);
        // ctx.fillStyle = "#ff0";
        // ctx.fillRect(this.position.x + offset.x, this.position.y + offset.y, 10, 10);
    }
}

module.exports = Sprite;