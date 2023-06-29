const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const streamersRouter = require("./routes/streamers.js");

const app = express();
const server = http.createServer(app);
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connectedUsers = [];

const io = socket(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    connectedUsers.push({
        id: socket.id,
        votes: []
    });

    console.log(`User ${socket.id} connected`);

    socket.on("disconnect", (reason) => {
        console.log(`User ${socket.id} disconnected - ${reason}`);
        connectedUsers = connectedUsers.filter(user => user.id !== socket.id);
    });
});

app.set("socketio", io);

app.use("/streamers", (req, res, next) => {
    req.setConnectedUsers = (newArray) => {
        connectedUsers = newArray;
    }
    req.getConnectedUsers = () => connectedUsers;
    next();
}, streamersRouter);

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server running on port ${PORT}`);
});