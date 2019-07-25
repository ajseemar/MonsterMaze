const { index } = require('../utils/utils');

class Camera {
    constructor(width, height, cellCount, cellSize) {
        this.cellCount = cellCount;
        this.cellSize = cellSize;
        this.screen = {
            x: width,
            y: height
        };
        this.startTile = {
            row: 0,
            col: 0
        };
        this.endTile = {
            row: 0,
            col: 0
        };
        this.offset = {
            x: 0,
            y: 0
        };
    }

    update(px, py) {
        // this.resize();
        this.offset.x = Math.floor(this.screen.x / 2 - px); // - this.screen.x / 2;
        this.offset.y = Math.floor(this.screen.y / 2 - py); // - this.screen.y / 2;
        // debugger
        // this.offset.x = -px;
        // this.offset.y = -py
        // const tile = {
        //     row: Math.floor(py / this.cellSize),
        //     col: Math.floor(px / this.cellSize)
        // };
        let row = Math.floor(py / this.cellSize);
        let col = Math.floor(px / this.cellSize);

        let maxHorizontalCells = Math.ceil(this.screen.x / this.cellSize);
        let maxVerticalCells = Math.ceil(this.screen.y / this.cellSize);
        // console.log(maxHorizontalCells, maxVerticalCells);
        // console.log(this.screen.x / this.cellSize);
        // console.log(this.screen.y / this.cellSize);

        this.startTile.col = col - Math.floor(maxHorizontalCells / 2);
        this.startTile.row = row - Math.floor(maxVerticalCells / 2);

        // this.startTile.row = row - 1 - Math.ceil((this.screen.x / 2) / this.cellSize);
        // this.startTile.col = col - 1 - Math.ceil((this.screen.y) / this.cellSize);
        // debugger
        if (this.startTile.row < 0) this.startTile.row = 0;
        if (this.startTile.col < 0) this.startTile.col = 0;

        this.endTile.col = col + 1 + Math.ceil(maxHorizontalCells / 2);
        this.endTile.row = row + 1 + Math.ceil(maxVerticalCells / 2);

        // this.endTile.row = row + 1 + Math.ceil((this.screen.x / 2) / this.cellSize);
        // this.endTile.col = col + 1 + Math.ceil((this.screen.y) / this.cellSize);
        // debugger

        // debugger
        if (this.endTile.row > this.cellCount) this.endTile.row = this.cellCount;
        if (this.endTile.col > this.cellCount) this.endTile.col = this.cellCount;
    }

    render(ctx, grid) {
        for (let j = this.startTile.col; j < this.endTile.col; j++) {
            for (let i = this.startTile.row; i < this.endTile.row; i++) {
                grid[index(i, j, this.cellCount)].render(ctx, null, this.offset.x, this.offset.y);
            }
        }
    }
}

module.exports = Camera;