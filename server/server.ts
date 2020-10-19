const app = require('express')();
const server = require('http').createServer(app);
const options = {
    serverClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
};
const io = require('socket.io')(server, options);
const port = 2302;

io.on('connection', socket => {
    console.log('connect');
});

server.listen(port, () => {
    console.log(`listening on 135.180.72.85:${port}`);
});