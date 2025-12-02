const io = require("socket.io-client");
const socket = io("http://localhost:3000");

setInterval (()=> {
    const packetRate = Math.floor(Math.random() * 200); 
    consttimestamp = Date.now();

    socket.emit("log", { packetRate, timestamp });
    console.log("Kirim", packetRate);


}, 1000)