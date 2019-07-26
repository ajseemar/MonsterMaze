const KEYS = require('./keys');

class Menu {
    constructor(game, type) {
        this.type = type || "start";
        this.visible = false;
        this.game = game;
        this.spaceDown = false;
        this.spaceUp = true;
        this.paused = ['.', '..', '...'];
        this.pauseCounter = 0;
    }

    renderStart(ctx) {

    }

    updatePause() {
        this.pauseCounter += 1;
        this.pauseCounter %= this.paused.length;
        console.log(this.pauseCounter);
    }

    renderPause(ctx) {
        ctx.fillStyle = "#fff";
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`PAUSED`, this.game.width / 2, this.game.height / 2);

        ctx.font = '20px Arial';
        ctx.fillText(`Press SPACE to Resume Game`, this.game.width / 2, this.game.height / 2 + 40);
        // ctx.fillText(`PAUSED${this.paused[this.pauseCounter]}`, this.game.width / 2, this.game.height / 2);
    }

    renderGameOver(ctx) {

    }

    handleInput() {
        if (this.game.ih.isPressed(KEYS.SPACE)) {
            // this.spaceDown = true;
            // this.spaceUp = false;
            if (this.game.canUnpause) {
                this.game.paused = false;
                // this.game.canUnpause = false;
                this.visible = false;
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
    }

    update(dt) {
        this.handleInput();
        this.game.render();
        if (this.visible) {
            this.render();
        } else {
            // this.game.handleInput();
            if (!this.game.paused) {
                this.game.update(dt);
            }
            // this.game.initialTime = time;
        }
    }

    render() {
        switch (this.type) {
            case "start":
                this.renderStart(this.game.ctx);
                break;
            case "pause":
                // this.updatePause();
                this.renderPause(this.game.ctx);
            case "game_over":
                this.renderGameOver(this.game.ctx);
            default:
                break;
        }
    }
}

module.exports = Menu;