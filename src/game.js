const { index } = require('./utils/utils');
const Grid = require('./maze/grid');
const Maze = require('./maze/maze');
const Player = require('./entities/player');
const InputManager = require('./utils/input');
const Enemy = require('./entities/enemy');

class Game {
    constructor(size, rm) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.cellCount = size;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('orientationchange', this.resize.bind(this), false);
        this.resize();

        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);
        this.maze = new Maze(this.cellCount, this.cellSize, this.width, this.height, this.grid);

        this.ih = new InputManager();
        this.player = new Player(rm.get('player_standing'), this.cellSize, this.ih);

        // let row = Math.floor(this.maze.height / this.player.position.y);
        // let col = Math.floor(this.maze.width / this.player.position.x);

        let row = Math.floor(this.player.position.y / this.player.size.h);
        let col = Math.floor(this.player.position.x / this.player.size.w);
        let end = this.grid.cells[index(row, col, this.cellCount)];
        this.enemy = new Enemy(rm.get('zombie'), this.cellSize, this.grid.cells, end);
        this.enemy2 = new Enemy(rm.get('zombie'), this.cellSize, this.grid.cells, end);

        // window.addEventListener('mousemove', this.handleRotation.bind(this));
        // window.addEventListener('click', this.handleClick.bind(this));
        window.setInterval(this.updateSolver.bind(this), 1000);

        this.initialTime = Date.now();
    }

    updateSolver() {
        // if (!this.enemy.solver.finished) return;
        this.grid.cells.forEach(cell => {
            cell.node.f = 0;
            cell.node.g = 0;
            cell.node.h = 0;
            cell.node.visited = false;
            // cell.node.position = Object.assign(cell.node.position);
        });
        // debugger
        let row = Math.floor(this.player.position.y / this.player.size.h);
        let col = Math.floor(this.player.position.x / this.player.size.w);
        let end = this.grid.cells[index(row, col, this.cellCount)];

        this.enemy.updateSolver(end);
        this.enemy2.updateSolver(end);
        // this.enemy.updateSolver(index(row, col, this.cellCount));
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
            w: this.width / this.cellCount,
            h: this.height / this.cellCount
        };
        if (this.grid) {
            this.grid.cells.forEach(cell => {
                cell.size = this.cellSize;
                cell.resize();
            });
        }
        if (this.player) this.player.sprite.resize(this.cellSize);
        if (this.enemy) this.enemy.sprite.resize(this.cellSize);
        if (this.enemy2) this.enemy2.sprite.resize(this.cellSize);
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
        this.enemy.update();
        this.enemy2.update();
        this.player.update(dt);
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.maze.render(this.ctx);
        // this.solver.render(this.ctx);
        this.player.render(this.ctx, { x: 0, y: 0 });
        this.enemy.render(this.ctx);
        this.enemy2.render(this.ctx);
    }
}

module.exports = Game;