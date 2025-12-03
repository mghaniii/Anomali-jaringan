const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const ss = require("simple-statistics");

const app = express();
app.use(cors()); // mengizinkan akses dari origin lain (dashboard)

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

let logs = [];


io.on("connection", (socket) => {
  console.log("Client terhubung:", socket.id);