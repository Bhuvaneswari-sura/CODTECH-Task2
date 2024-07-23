const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('new-user', username => {
        socket.username = username;
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('chat-message', message => {
        socket.broadcast.emit('chat-message', { username: socket.username, message: message });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', socket.username);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
