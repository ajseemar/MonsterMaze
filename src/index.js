import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('lobbyFilled', () => {
    
});

const render = () => {
    let time = Date.now();
    let dt = (time - game.initialTime) / 1000.0;
    
    game.initialTime = time;
    requestAnimationFrame(render);
}