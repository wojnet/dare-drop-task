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

const io = socket(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
    // socket.join("random-room");
    socket.on("disconnect", (reason) => console.log(`Client ${socket.id} disconnected - ${reason}`));
});

app.set("socketio", io);

app.use("/streamers", streamersRouter);

// const getRandomNumber = () => Math.floor(Math.random()*100000);

// setInterval(() => {
//     io.to("random-room").emit("number", getRandomNumber());
// }, 1000);

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server running on port ${PORT}`);
});