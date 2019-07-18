const Grid = require('./maze/grid');
const Maze = require('./maze/maze');
const A_Star = require('./maze/solver/a_star');

class Game {
    constructor(size, rm) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.cellCount = size;
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('orientationchange', this.resize.bind(this), false);
        this.resize();

        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);
        this.maze = new Maze(this.cellCount, this.width, this.height, this.grid);

        this.solver = new A_Star(this.grid);

        this.initialTime = Date.now();
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

    update() {
        this.solver.update();
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.maze.render(this.ctx);
        this.solver.render(this.ctx);
        // console.log('rendering...');
    }
}

module.exports = Game;