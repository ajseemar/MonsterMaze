class Menu {
    constructor(game, type) {
        this.type = type || "start";
        this.visible = false;
        this.game = game;
    }

    renderStart() {

    }

    renderPause() {

    }

    renderGameOver() {

    }

    handleInput() {

    }

    update(dt) {
        this.handleInput();
        if (this.visible) {
            this.render();
        } else {
            this.game.update(dt);
            this.game.render();
            // this.game.initialTime = time;
        }
    }

    render() {
        switch (this.type) {
            case "start":
                this.renderStart();
                break;
            case "pause":
                this.renderPause();
            case "game_over":
                this.renderGameOver();
            default:
                break;
        }
    }
}

module.exports = Menu;