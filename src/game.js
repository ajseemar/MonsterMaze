const { index } = require('./utils/utils');
const Grid = require('./maze/grid');
const Maze = require('./maze/maze');
const Player = require('./entities/player');
const InputManager = require('./utils/input');
const Enemy = require('./entities/enemy');
const Cell = require('./maze/cell');
const Boid = require('./entities/boid');


// GAME CONSTANTS
const MAX_ENEMIES = 20;

class Game {
    constructor(size, rm) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.cellCount = size;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('orientationchange', this.resize.bind(this), false);
        this.resize();

        this.rm = rm;
        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);
        this.maze = new Maze(this.cellCount, this.cellSize, this.width, this.height, this.grid);

        this.ih = new InputManager();
        window.player = this.player = new Player(rm.get('player_standing'), this.cellSize, this.ih);

        // let row = Math.floor(this.maze.height / this.player.position.y);
        // let col = Math.floor(this.maze.width / this.player.position.x);

        let row = Math.floor(this.player.position.y / this.player.size.h);
        let col = Math.floor(this.player.position.x / this.player.size.w);
        let end = this.grid.cells[index(row, col, this.cellCount)];

        // window.addEventListener('mousemove', this.handleRotation.bind(this));
        // window.addEventListener('click', this.handleClick.bind(this));
        // window.setInterval(this.updateSolver.bind(this), 500);
        window.setInterval(this.spawnEnemy.bind(this), 1000);
        window.zombies = this.zombies = [];

        // for (let i = 0; i < 3; i++) this.spawnEnemy();
        this.initialTime = Date.now();
    }

    spawnEnemy() {
        if (this.zombies.length >= MAX_ENEMIES) return;
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
        this.zombies.push(zombie);
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
            w: 100,
            h: 100
            // w: this.width / this.cellCount,
            // h: this.height / this.cellCount
        };
        if (this.grid) {
            this.grid.cells.forEach(cell => {
                cell.size = this.cellSize;
                cell.resize();
            });
        }
        if (this.player) this.player.sprite.resize(this.cellSize);
        if (this.zombies && this.zombies.length > 0) {
            this.zombies.forEach(zombie => zombie.resize(this.cellSize));
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

    handleRotation(e) {
        // e.preventDefault();
        const delta = {
            dx: e.clientX,
            dy: e.clientY
        };
        this.player.handleRotation(delta);
    }

    handleClick(e) {

    }

    // spawnEnemy() {

    // }

    updateGamepad() {
        this.gamepad = navigator.getGamepads()[0];
        if (!this.gamepad) return false; // no gamepad to update. Use key states from inputHandler

        // handle shooting bullets
        if (this.gamepad.axes[4] > 0) {
            // console.log('Right Trigger Pressed');
            this.player.shoot();
        }

        // handle velocity
        this.player.velocity.x = this.gamepad.axes[0] * this.player.speed;
        this.player.velocity.y = this.gamepad.axes[1] * this.player.speed;

        // handle rotation
        if (this.gamepad.axes[2] !== 0 && this.gamepad.axes[3] !== 0) {
            this.player.delta = {
                x: this.gamepad.axes[2],
                y: this.gamepad.axes[3]
            };
            this.player.angle = Math.atan2(this.gamepad.axes[3], this.gamepad.axes[2]) * 180 / Math.PI;
        }

        if (this.player.angle < 0) {

            this.player.angle = 360 + this.player.angle;

        }

        // successfully updated gamepad
        return true;
    }

    update(dt) {
        // this.solver.update();
        if (!this.updateGamepad()) {
            this.player.handleInput();
            // this.player.handleRotation(this.mousePos);
        }
        // this.enemy.update();
        this.zombies.forEach(zombie => {
            zombie.solver.update();
            // if (zombie.solver.finished) {
            // zombie.follow(zombie.solver.path);
            zombie.applyBehaviors(zombie.solver.path, this.zombies, this.player.position);
            // debugger
            zombie.update();
            // }
            // zombie.applyBehaviors(zombie.solver.path, this.zombies);
            // zombie.solver.update();
            // this.updateSolver(zombie);
        });
        // this.enemy2.update();
        this.player.update(dt);
    }

    render() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.maze.render(this.ctx);
        // this.solver.render(this.ctx);
        this.player.render(this.ctx, { x: 0, y: 0 });
        // this.enemy.render(this.ctx);
        // this.enemy2.render(this.ctx);
        this.zombies.forEach(zombie => {
            // if (zombie.solver.finished)
            zombie.render(this.ctx);
        });
    }
}

module.exports = Game;