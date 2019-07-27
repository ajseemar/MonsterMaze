const KEYS = require('../utils/keys');
const Sprite = require('./sprite');
const Bullet = require('./bullet');
const Vector = require('../utils/vector');

Function.prototype.throttle = function (interval) {
    // declare a variable outside of the returned function
    let tooSoon = false;
    return (...args) => {
        // the function only gets invoked if tooSoon is false
        // it sets tooSoon to true, and uses setTimeout to set it back to
        // false after interval ms
        // any invocation within this interval will skip the if 
        // statement and do nothing
        if (!tooSoon) {
            tooSoon = true;
            setTimeout(() => tooSoon = false, interval);
            this(...args);
        }
    }
}

const throttle = (func, interval) => {
    let tooSoon = false;
    return (...args) => {
        if (!tooSoon) {
            tooSoon = true;
            setTimeout(() => tooSoon = false, interval);
            func(...args);
        }
    }
}


Function.prototype.debounce = function (interval) {
    // declare a variable outside of the returned function
    let timeout;
    // return a function that takes an arbitrary number of arguments
    return (...args) => {
        // declare a function that sets timeout to null and invokes this with args
        const fnCall = () => {
            timeout = null;
            this(...args);
        }
        // each time this function is called, it will clear the previous timeout
        // and create a new one that invokes fnCall after the interval has passed
        // since the timeout is reset every time the function is invoked, 
        // fnCall will only be called once the interval has passed without any new 
        // invocations
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, interval);
    }
}

class Player extends Sprite {
    constructor(sprite, cellSize, inputHandler) {
        super(sprite, cellSize);
        this.hpMax = this.hp = 100;
        // this.size = size / 3;
        // this.radius = this.size * 3 / 2;

        // this.position.x = this.sprite.width - this.sprite.width / 2;
        // this.position.y = this.sprite.height - this.sprite.height / 2;
        this.position.x = cellSize.w / 2;
        this.position.y = cellSize.h / 2;

        this.speed = 250;

        this.ih = inputHandler;

        this.size = cellSize;

        // this.radius = size.w > size.h ? size.h / 5 : size.w / 5;
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
        // this.shoot = throttle(this.shoot.bind(this), 100);
        // document.addEventListener('mousemove', this.handleRotation.bind(this));
        // this.shoot = this.shoot.throttle(100);
        this.shoot = throttle(this.shoot.bind(this), 50);
        // this.shoot = this.shoot.debounce(100);
        this.delta = new Vector();
        this.bullets = {};
        this.keys = {
            "blue": null,
            "green": null,
            "red": null
        };

        this.time = Date.now();
        this.kills = 0;
    }

    handleRotation(delta, origin) {
        this.angle = Math.atan2(delta.y, delta.x) * 180 / Math.PI;

        if (this.angle < 0) {

            this.angle = 360 + this.angle;

        }
        // const dist = Vector.sub(origin, delta);
        // this.angle = dist.angleBetween(new Vector(1, 0));
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

    shoot(delta) {
        // debugger
        const bullet = new Bullet(this.bulletSprite, this.position, this.size);
        let x, y;
        if (navigator.getGamepads()[0]) {
            x = this.delta.x;
            y = this.delta.y;
        } else {
            x = delta.x;
            y = delta.y;
        }
        const magnitude = Math.sqrt(x * x + y * y);

        x /= magnitude;
        y /= magnitude;

        bullet.updateVelocity(x, y);
        // if (!bullet.sprite) return;
        this.bullets[bullet.id] = bullet;
    }

    hit() {
        this.hp -= 0.05;
        if (this.hp < 0) this.hp = 0;
    }

    dead() {
        return this.hp <= 0;
    }

    pickUpKey(key) {
        console.log('picked up key:', key);
        this.keys[key.keyColor] = key;
    }

    update(dt, collisionDetector) {
        // this.handleInput();
        // this.position.x += this.velocity.x * dt;
        // this.position.y += this.velocity.y * dt;
        this.position.add(this.velocity.multiply(dt));
        // console.log(this.velocity);

        Bullet.update(this.bullets, collisionDetector, dt);
    }

    renderUI(ctx) {
        const grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);

        // Add colors
        // grd.addColorStop(0.000, 'rgba(225, 0, 25, 1.000)');
        // grd.addColorStop(0.330, 'rgba(255, 127, 0, 1.000)');
        // grd.addColorStop(0.657, 'rgba(255, 255, 0, 1.000)');
        // grd.addColorStop(1.000, 'rgba(0, 96, 27, 1.000)');

        // Fill with gradient
        ctx.fillStyle = "#c7c7c7";
        ctx.fillRect(75, 40, 1000, 83);
        // ctx.fillStyle = grd;
        // ctx.fillStyle = "#cc0000";

        // gradient color
        const ar = 255;
        const ag = 0;
        const ab = 0;

        const br = 0;
        const bg = 255;
        const bb = 0;

        const ratio = this.hp / this.hpMax;
        const cr = ar + (br - ar) * ratio;
        const cg = ag + (bg - ag) * ratio;
        const cb = ab + (bb - ab) * ratio;
        ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
        const width = Math.floor(1000 * this.hp / this.hpMax);
        ctx.fillRect(75, 40, width, 83);

        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "#FF0000";
        const d = 50
        const k = 10;
        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        // ctx.beginPath()
        // ctx.arc(50, 25, 4, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        // ctx.beginPath()
        // ctx.arc(20, 25, 4, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        // ctx.beginPath()
        // ctx.arc(75, 40, 4, 0, 2 * Math.PI);
        ctx.stroke();
        // ctx.closePath();
        ctx.fill()
        ctx.restore();
    }

    render(ctx, offset) {
        // debug sphere
        // ctx.fillStyle = "#f0f";
        // ctx.beginPath();
        // ctx.arc(this.position.x + offset.x, this.position.y + offset.y, this.radius, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();

        // hp bar

        // ctx.moveTo(k, k + d / 4);
        // ctx.quadraticCurveTo(k, k, k + d / 4, k);
        // ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        // ctx.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
        // ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        // ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
        // ctx.lineTo(k + d / 2, k + d);
        // ctx.lineTo(k + d / 4, k + d * 3 / 4);
        // ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        // ctx.stroke();
        // ctx.fill();







        // ctx.beginPath();
        // ctx.arc(75, 40, 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.arc(50, 25, 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.arc(20, 62.5, 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.arc(75, 120, 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.arc(130, 62.5, 2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath();
        // ctx.fillStyle = "#0f0";
        // ctx.fillRect(d + k, k, d, d);

        // ctx.strokeStyle = "#0f0";
        // ctx.moveTo(d + k, 0);
        // ctx.lineTo(d + k, d + k);
        // ctx.moveTo(50, 0);
        // ctx.lineTo(100, 100);

        ctx.save();
        ctx.translate(this.position.x + offset.x, this.position.y + offset.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        ctx.restore();



        Bullet.render(this.bullets, ctx, offset);

    }
}

module.exports = Player;