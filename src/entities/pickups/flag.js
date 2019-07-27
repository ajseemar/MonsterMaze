const Sprite = require('../sprite');

class Flag extends Sprite {
    constructor(sprite, size) {
        super(sprite, size);
    }

    render(ctx, offset) {
        ctx.save();
        // ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        // ctx.translate(this.position.x + offset.x + this.size.w / 2, this.position.y + offset.y + this.size.h / 2);
        // ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, 0, 0, this.sprite.size.w, this.sprite.size.h);
        // ctx.drawImage(this.sprite, 0, 0);
        // ctx.beginPath();
        // // ctx.arc(8, 12, 8, 0, Math.PI * 2);
        // ctx.closePath();
        // ctx.fill();
        ctx.restore();
    }
}

module.exports = Flag;