const Player = require('../src/player');

class Game {
    constructor (sockets) {
        this.players = {};
        this.generatePlayers(sockets);
        this.init();
    }

    generatePlayers (sockets) {
        Object.values(sockets).forEach(socket => {
            this.players[socket.id] = new Player();
            console.log(this.players[socket.id].name);
        });
    }

    update (dt) {
        console.log('update loop', dt);
    }
}

module.exports = Game;