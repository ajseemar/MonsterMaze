const express = require("express");
const app = express();
const serv = require('http').Server(app);

app.get("/", (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
serv.listen(port);

const io = require('socket.io')(serv, {});

io.sockets.on('connection', socket => {
    console.log(`${socket.id}: Joined the session`);

    socket.on('disconnect', () => {
        console.log(`${socket.id}: Left the session`);
    });
});