import io from 'socket.io-client';

const Player = require('./player');

const update = (initialTime) => {
    let time = Date.now();
    let dt = (time - initialTime) / 1000.0;
    socket.emit('update', dt);
    initialTime = time;
    requestAnimationFrame(() => update(initialTime));
}

const socket = io('http://localhost:3000');

socket.on('lobbyFilled', () => {
    let initialTime = Date.now();
    update(initialTime);
});

socket.on('render', () => {
    console.log('render loop');
});