const { index } = require('./utils/utils');
const Grid = require('./maze/grid');
const Maze = require('./maze/maze');
const Player = require('./entities/player');
const InputManager = require('./utils/input');
const Boid = require('./entities/boid');
const Camera = require('./entities/camera');
const Vector = require('./utils/vector');
const Bullet = require('./entities/bullet');
const CollisionDetector = require('./physics/collision');
const KEYS = require('./utils/keys');

// GAME CONSTANTS
const MAX_ENEMIES = 25;

class Game {
    constructor(size, rm) {
        this.rm = rm;
        this.rm.onReady(this.initPlayer.bind(this));

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.cellCount = size;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('orientationchange', this.resize.bind(this), false);
        this.resize();

        this.ih = new InputManager();

        this.player = new Player(this.rm.get('player_standing'), this.cellSize, this.ih);
        this.collisionDetector = new CollisionDetector(size);


        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);
        this.maze = new Maze(this.cellCount, this.cellSize, this.width, this.height, this.grid);


        this.viewport = new Camera(this.width, this.height, size, this.cellSize.w);

        window.addEventListener('mousemove', this.handleRotation.bind(this));
        // window.addEventListener('click', this.handleClick.bind(this));
        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));

        window.setInterval(this.spawnEnemy.bind(this), 1000);
        this.zombies = {};

        this.mousePos = new Vector();

        this.paused = false;
        this.canUnpause = false;

        this.gameOver = false;
        this.started = false;

        window.addEventListener("gamepadconnected", (e) => {
            // this.inputHandler.gamepad = e.gamepad
            console.log('gamepad connected: ', e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("A gamepad disconnected:");
            delete this.inputHandler.gamepad;
            console.log(event.gamepad);
        });

        // for (let i = 0; i < 3; i++) this.spawnEnemy();
        this.initialTime = Date.now();
    }

    restart() {
        delete this.player;
        delete this.grid;
        delete this.maze;
        delete this.zombies;
        this.player = new Player(this.rm.get('player_standing'), this.cellSize, this.ih);
        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);
        this.maze = new Maze(this.cellCount, this.cellSize, this.width, this.height, this.grid);
        this.zombies = {};

        this.gameOver = false;
        this.paused = false;
        this.canUnpause = false;
        this.initialTime = Date.now();
    }

    initPlayer() {
        this.player.sprite = this.rm.get('player_standing');
        Bullet.sprite = this.player.bulletSprite = this.rm.get('bullet');
        // Object.values(this.player.bullets).forEach(bullet => bullet.sprite = this.player.bulletSprite);
        // debugger
    }

    spawnEnemy() {
        if (Object.keys(this.zombies).length >= MAX_ENEMIES || this.paused) return;
        let row = Math.floor(this.player.position.y / this.player.size.h);
        let col = Math.floor(this.player.position.x / this.player.size.w);
        let end = index(row, col, this.cellCount);
        // this.zombies.push(new Enemy(`zombie_${this.zombies.length + 1}`, this.rm.get('zombie'), this.cellSize, this.grid.cells, end));
        // let cells = this.grid.cells.map(cell => new Cell(cell.row, cell.col, cell.size));
        let cells = Array.from(this.grid.cells);
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            cells[i] = Object.assign({}, Object.create(Object.getPrototypeOf(cell)), cell);
            // cells[i] = new Cell(cell.row, cell.col, cell.size);
        }
        let zombie = new Boid(`zombie_${this.zombies.length + 1}`, this.rm.get('zombie'), this.cellSize, this.grid.cells, end);
        window.setInterval(this.updateSolver.bind(this, zombie), 1000);
        // this.zombies.push(zombie);
        this.zombies[zombie.id] = zombie;
    }

    updateSolver(zombie) {

        let row = Math.floor(this.player.position.y / this.player.size.h);
        let col = Math.floor(this.player.position.x / this.player.size.w);
        // let end = this.grid.cells[index(row, col, this.cellCount)];
        // let end = this.grid.cells[index(row, col, this.cellCount)];
        // console.log(player.position.x, player.position.y);
        // console.log(row, col);
        let end = index(row, col, this.cellCount);
        // let end2 = this.enemy.solver.cells[index(row, col, this.cellCount)];
        // this.zombies.forEach(zombie => zombie.updateSolver(end));
        zombie.updateSolver(end);
    }

    resize() {
        const ratio = 16 / 9;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // if (this.canvas.width > this.canvas.height / ratio) this.canvas.width = this.canvas.height * ratio;
        // else if (this.canvas.height > this.canvas.width / ration) this.canvas.height = this.canvas.width * ratio;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cellSize = {
            w: 150,
            h: 150
            // w: this.width / this.cellCount,
            // h: this.height / this.cellCount
        };
        if (this.viewport) {
            this.viewport.screen.x = this.width;
            this.viewport.screen.y = this.height;
        }
        if (this.grid) {
            this.grid.cells.forEach(cell => {
                cell.size = this.cellSize;
                cell.resize();
            });
        }
        // if (this.player) this.player.sprite.resize(this.cellSize);
        if (this.zombies && Object.keys(this.zombies).length > 0) {
            Object.values(this.zombies).forEach(zombie => zombie.resize(this.cellSize));
        }
        // if (this.enemy) this.enemy.resize(this.cellSize);
        // if (this.enemy2) this.enemy2.resize(this.cellSize);
        // if (this.solver && this.solver.finished) {
        //     this.solver.path.resize();
        // }
        // const widthToHeight = 4 / 3;
        // let width = window.innerWidth - 5;
        // let height = window.innerHeight - 5;
        // this.canvas.width = width;
        // this.canvas.height = height;
        // const fwidthToHeight = width / height;

        // const gameContent = document.getElementById('main-content');
        // // debugger
        // if (fwidthToHeight > widthToHeight) {
        //     width = height * widthToHeight;
        //     gameContent.style.height = height + 'px';
        //     gameContent.style.width = width + 'px';
        // } else {
        //     height = width / widthToHeight;
        //     gameContent.style.height = height + 'px';
        //     gameContent.style.width = width + 'px';
        // }

        // gameContent.style.marginTop = (-height / 2) + 'px';
        // gameContent.style.marginLeft = (-width / 2) + 'px';

        // this.canvas.width = innerWidth;
        // this.canvas.height = innerHeight;
    }

    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        const dy = mousePos.y - this.canvas.height / 2;
        const dx = mousePos.x - this.canvas.width / 2;

        this.mousePos.x = dx;
        this.mousePos.y = dy;
        return { x: dx, y: dy };
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.player.firing = true;

    }

    handleMouseUp(e) {
        e.preventDefault();
        this.player.firing = false;
    }

    handleClick(e) {
        // if (this.paused) return;
        // e.preventDefault();
        // this.player.shoot(this.getMousePosition(e));

    }

    handleRotation(e) {
        if (this.paused) return;
        this.mousePos = this.getMousePosition(e);
        // this.player.shoot = this.player.shoot.bind(this.player, this.mousePos);
    }

    // spawnEnemy() {

    // }

    updateGamepad() {
        this.gamepad = navigator.getGamepads()[0];
        if (!this.gamepad) return false; // no gamepad to update. Use key states from inputHandler

        // handle shooting bullets
        if (this.gamepad.axes[4] > 0.7) {
            // console.log('Right Trigger Pressed');
            // this.player.shoot(this.mousePos);
        }

        // handle velocity
        this.player.velocity.x = this.gamepad.axes[0] * this.player.speed;
        this.player.velocity.y = this.gamepad.axes[1] * this.player.speed;

        // handle rotation
        // if ((this.gamepad.axes[2] !== 0 && Math.abs(this.gamepad.axes[3]) >= 0.001) ||
        //     (Math.abs(this.gamepad.axes[2]) >= 0.001 && Math.abs(this.gamepad.axes[3]) !== 0)) {
        if (Math.abs(this.gamepad.axes[2]) >= 0.001 || Math.abs(this.gamepad.axes[3]) >= 0.001) {
            this.player.delta = new Vector(this.gamepad.axes[2], this.gamepad.axes[3]);
            this.player.angle = Math.atan2(this.gamepad.axes[3], this.gamepad.axes[2]) * 180 / Math.PI;
        }

        if (this.player.angle < 0) {

            this.player.angle = 360 + this.player.angle;

        }

        // successfully updated gamepad
        return true;
    }

    // handleInput() {
    //     if (this.ih.isPressed(KEYS.SPACE)) {
    //         if (this.canUnpause) this.paused = false;
    //         else this.paused = true;
    //     }
    // }

    update(dt) {
        // check if game over
        if (this.player.dead()) this.gameOver = true;

        // recalculate portion of game map that is collidable
        this.collisionDetector.updateCollidables(this.viewport.startTile, this.viewport.endTile, this.grid.cells);

        // if gamepad is connected, update player position using gamepad otherwise handle keyboard and mouse input
        if (!this.updateGamepad()) {
            this.player.handleInput();
            this.player.handleRotation(this.mousePos);
            if (this.player.firing) this.player.shoot(this.mousePos);
        }
        this.player.update(dt, this.collisionDetector);

        // resolve any collisions that may have occurred after player movement
        const collided = this.collisionDetector.detectCollision(this.player);
        collided.forEach(collision => this.collisionDetector.resolveCollision(collision, this.player));

        // update all the zombies
        Object.keys(this.zombies).forEach(id => {
            const zombie = this.zombies[id];
            zombie.solver.update();
            // if (zombie.solver.finished) {
            // zombie.follow(zombie.solver.path);
            zombie.applyBehaviors(zombie.solver.path, Object.values(this.zombies), this.player.position);
            // debugger
            zombie.update();
            // }
            // zombie.applyBehaviors(zombie.solver.path, this.zombies);
            // zombie.solver.update();
            // this.updateSolver(zombie);

            // TODO create zombie hit function that decreases hp
            zombie.attack(this.player);
            if (zombie.dead()) {
                delete this.zombies[zombie.id];
            } else {
                Object.keys(this.player.bullets).forEach(id => {
                    // bullets[id].update(dt);
                    if (this.player.bullets[id].hit(zombie)) {
                        if (zombie.dead()) delete this.zombies[zombie.id];
                        delete this.player.bullets[id];
                    }
                    // const bullet = this.player.bullets[id];
                    // const dist = bullet.position.dist(zombie.position);
                    // if (dist <= bullet.radius + zombie.radius) delete this.player.bullets[id];
                    // const collided = collisionDetector.detectCollision(bullets[id]);
                    // if (collided.length > 0) bullets[id].collided = true;
                    // if (bullets[id].collided) delete bullets[id];
                });

                // handle any collisions that may have occured between zombie and walls
                const collided = this.collisionDetector.detectCollision(zombie);
                collided.forEach(collision => this.collisionDetector.resolveCollision(collision, zombie));
            }
        });
        // this.enemy2.update();


        this.viewport.update(this.player.position.x, this.player.position.y);
    }

    render() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // this.maze.render(this.ctx);

        this.viewport.render(this.ctx, this.grid.cells);
        // this.solver.render(this.ctx);
        // this.enemy.render(this.ctx);
        // this.enemy2.render(this.ctx);
        if (this.started) this.player.render(this.ctx, this.viewport.offset);

        Object.values(this.zombies).forEach(zombie => {
            // if (zombie.solver.finished)
            zombie.render(this.ctx, this.viewport.offset);
        });

        if (this.started) this.player.renderUI(this.ctx);

        // debug info mouse pos rotation angle
        this.ctx.fillStyle = "#fff";
        // this.ctx.fillText(`mouseX: ${this.mousePos.x}`, 0, 10);
        // this.ctx.fillText(`mouseY: ${this.mousePos.y}`, 0, 20);
        // this.ctx.fillText(`player_angle: ${this.player.angle}`, 0, 30);
    }
}

module.exports = Game;