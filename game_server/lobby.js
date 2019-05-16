const Game = require('./game');

class Lobby {
    constructor (size) {
        this.size = size;
        this.sockets = {};
    }

    addSocket (socket) {
        this.sockets[socket.id] = socket;
        const sockets = Object.values(this.sockets);
        // if (sockets.length === this.size) this.game = new Game (sockets);
        if (sockets.length === this.size) sockets.forEach(socket => {
            socket.emit('lobbyFilled');
        });
    }

    deleteSocket (socketId) {
        delete this.sockets[socket.id];
    }
}

module.exports = Lobby;