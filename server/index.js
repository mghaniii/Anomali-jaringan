const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const ss = require("simple-statistics");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);