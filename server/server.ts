const app = require('express')();
const server = require('http').createServer(app);
const options = {
    serverClient: false
};
const io = require('socket.io')(server, options);
const port = 2302;

io.on('connection', socket => {

    socket.emit('an event', { some: 'data' });

    socket.emit('hello', 'world', (data) => {
        console.log(data);
    });

    socket.join('room 0', () => {

        let rooms = Object.keys(socket.rooms);

        console.log(rooms);
    })
});

server.listen(port, () => {
    console.log(`listening on 135.180.72.85:${port}`);
});