const KEYS = require('../utils/keys');
const Sprite = require('./sprite');
// const Bullet = require('./bullet');
const Vector = require('../utils/vector');

class Player extends Sprite {
    constructor(sprite, cellSize, inputHandler) {
        super(sprite, cellSize);
        // this.size = size / 3;
        // this.radius = this.size * 3 / 2;

        this.position = new Vector(this.sprite.width - this.sprite.width / 2, this.sprite.height - this.sprite.height / 2);

        this.speed = 250;

        this.ih = inputHandler;

        this.size = cellSize;

        // this.bullets = {};

        // const debounce = (func, delay) => {
        //     let inDebounce
        //     return function () {
        //         const context = this
        //         const args = arguments
        //         clearTimeout(inDebounce)
        //         inDebounce = setTimeout(() => func.apply(context, args), delay)
        //     }
        // }

        // const throttle = (func, limit) => {
        //     let lastFunc
        //     let lastRan
        //     return function () {
        //         const context = this
        //         const args = arguments
        //         if (!lastRan) {
        //             func.apply(context, args)
        //             lastRan = Date.now()
        //         } else {
        //             clearTimeout(lastFunc)
        //             lastFunc = setTimeout(function () {
        //                 if ((Date.now() - lastRan) >= limit) {
        //                     func.apply(context, args)
        //                     lastRan = Date.now()
        //                 }
        //             }, limit - (Date.now() - lastRan))
        //         }
        //     }
        // }

        // // this.shoot = debounce(this.shoot, 10);
        // this.shoot = throttle(this.shoot, 100);
        // document.addEventListener('mousemove', this.handleRotation.bind(this));
    }

    handleRotation(delta) {
        this.angle = Math.atan2(delta.dy, delta.dx) * 180 / Math.PI;
        // console.log(e.clientY, e.clientX);
        if (this.angle < 0) {

            this.angle = 360 + this.angle;

        }
    }

    handleInput() {
        // debugger
        if (this.ih.isPressed(KEYS.UP)) {
            this.velocity.y = -this.speed;
        } else if (this.ih.isPressed(KEYS.DOWN)) {
            this.velocity.y = this.speed;
        } else {
            this.velocity.y = 0;
        }

        if (this.ih.isPressed(KEYS.RIGHT)) {
            this.velocity.x = this.speed;
        } else if (this.ih.isPressed(KEYS.LEFT)) {
            this.velocity.x = -this.speed;
        } else {
            this.velocity.x = 0;
        }
    }

    // shoot(delta) {
    //     const bullet = new Bullet(this.bulletSprite, this.position);
    //     let x, y;
    //     if (navigator.getGamepads()[0]) {
    //         x = this.delta.x;
    //         y = this.delta.y;
    //     } else {
    //         x = delta.x;
    //         y = delta.y;
    //     }
    //     const magnitude = Math.sqrt(x * x + y * y);

    //     x /= magnitude;
    //     y /= magnitude;

    //     bullet.updateVelocity(x, y);
    //     this.bullets[bullet.id] = bullet;
    // }

    update(dt, collisionDetector) {
        this.handleInput();
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        // console.log(this.velocity);

        // Bullet.update(this.bullets, collisionDetector, dt);
    }

    render(ctx, offset) {

        ctx.save();
        ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        ctx.restore();

        // Bullet.render(this.bullets, ctx, offset);

    }
}

module.exports = Player;