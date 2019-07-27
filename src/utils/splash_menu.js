const KEYS = require('./keys');

class Menu {
    constructor(game, type) {
        this.type = type || "start";
        this.game = game;
        this.spaceDown = false;
        this.spaceUp = true;
        this.paused = ['.', '..', '...'];
        this.pauseCounter = 0;

        this.game.paused = true;
        this.visible = true;
    }

    renderStart(ctx) {
        ctx.fillStyle = "#f00";
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Monster Maze`, this.game.width / 2, this.game.height / 2);
        // ctx.fillText(`PAUSED${this.paused[this.pauseCounter]}`, this.game.width / 2, this.game.height / 2);

        ctx.font = '20px Arial';
        ctx.fillText(`Press ENTER to Start Game`, this.game.width / 2, this.game.height / 2 + 40);
    }

    updatePause() {
        this.pauseCounter += 1;
        this.pauseCounter %= this.paused.length;
        // console.log(this.pauseCounter);
    }

    renderPause(ctx) {
        ctx.fillStyle = "#fff";
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`PAUSED`, this.game.width / 2, this.game.height / 2);
        // ctx.fillText(`PAUSED${this.paused[this.pauseCounter]}`, this.game.width / 2, this.game.height / 2);

        ctx.font = '20px Arial';
        ctx.fillText(`Press SPACE to Resume Game`, this.game.width / 2, this.game.height / 2 + 40);
    }

    renderWinner(ctx) {
        ctx.fillStyle = "#0ff";
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`You Survived...`, this.game.width / 2, this.game.height / 2);
        // ctx.fillText(`PAUSED${this.paused[this.pauseCounter]}`, this.game.width / 2, this.game.height / 2);

        ctx.textAlign = 'left';
        ctx.font = '40px Arial';
        ctx.fillText(`Time: ${this.game.totalTime}s`, this.game.width / 4 + 100, this.game.height / 2 + 40);

        ctx.textAlign = 'left';
        ctx.font = '40px Arial';
        ctx.fillText(`Kills: ${this.game.player.kills}`, this.game.width / 2 + 200, this.game.height / 2 + 40);

        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillText(`Press ENTER to Start Next Round`, this.game.width / 2, this.game.height / 2 + 100);
    }

    renderGameOver(ctx) {
        ctx.fillStyle = "#f00";
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`GAME OVER!`, this.game.width / 2, this.game.height / 2);
        // ctx.fillText(`PAUSED${this.paused[this.pauseCounter]}`, this.game.width / 2, this.game.height / 2);

        ctx.font = '20px Arial';
        ctx.fillText(`Press ENTER to Try Again`, this.game.width / 2, this.game.height / 2 + 40);
    }

    handleInput() {
        if (this.game.ih.isPressed(KEYS.SPACE)) {
            // this.spaceDown = true;
            // this.spaceUp = false;
            if (this.game.canUnpause) {
                this.game.paused = false;
                // this.game.canUnpause = false;
                this.visible = false;
                this.type = "";
            }
            else {
                this.game.paused = true;
                this.visible = true;
                this.type = "pause";
                // this.game.canUnpause = false;
            }
        } else {
            // this.spaceUp = true;
            // this.spaceDown = false;
            if (this.game.paused) this.game.canUnpause = true;
            else this.game.canUnpause = false;
        }

        if (this.game.ih.isPressed(KEYS.ENTER)) {
            if (this.game.gameOver) {
                this.game.restart();
                this.visible = false;
                this.type = "";
            } else if (!this.started) {
                this.visible = false;
                this.type = "";
                this.game.paused = false;
                this.game.started = true;
            }
        }
    }

    update(dt) {
        this.handleInput();
        this.game.render();
        if (this.visible) {
            this.render();
        } else if (this.game.gameOver) {
            this.game.paused = true;
            this.visible = true;
            this.type = "game_over"
        } else if (this.game.gameWon) {
            this.game.paused = true;
            this.visible = true;
            this.game.gameOver = true;
            this.type = "congratulations";
        } else {
            // this.game.handleInput();
            if (!this.game.paused) {
                this.game.update(dt);
            }
        }
    }

    render() {
        switch (this.type) {
            case "start":
                this.renderStart(this.game.ctx);
                break;
            case "pause":
                this.renderPause(this.game.ctx);
                break;
            case "congratulations":
                this.renderWinner(this.game.ctx);
                break;
            case "game_over":
                this.renderGameOver(this.game.ctx);
                break;
            default:
                break;
        }
    }
}

module.exports = Menu;