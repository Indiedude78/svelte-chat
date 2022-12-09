const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
});

let currentUsers = [];

io.on("connection", (socket) => {
    console.log("A user connected with id: ", socket.id);
    socket.on('message', ({ ...msgData }) => {
        io.sockets.emit('getMessage', {
            ...msgData,
        });
    });
    socket.on("join", (data) => {
        console.log(data);
        currentUsers.push(data);
    })
    socket.on('disconnected', () => {
        console.log('A user disconnected');
    });
});

httpServer.listen(3000, () => {
    console.log("listening on localhost:3000");
});