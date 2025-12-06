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

 
  socket.on("log", (data) => {
   

    logs.push(data);

   
    io.emit("log-broadcast", data);

   
    cekAnomali();
  });
});


function cekAnomali() {
  // butuh minimal 20 data untuk hitung statistik yang lumayan stabil
  if (logs.length < 20) return;

  const rates = logs.map((l) => l.packetRate);

  const mean = ss.mean(rates);
  const std = ss.standardDeviation(rates);


  if (std === 0) return;

  const terbaru = logs[logs.length - 1];
  const z = (terbaru.packetRate - mean) / std;

  
  if (Math.abs(z) > 3) {
    console.log("⚠️ ANOMALI TERDETEKSI");
    console.log("   nodeId    :", terbaru.nodeId);
    console.log("   packetRate:", terbaru.packetRate);
    console.log("   mean      :", mean.toFixed(2));
    console.log("   std       :", std.toFixed(2));
    console.log("   z-score   :", z.toFixed(2));


    io.emit("anomaly", {
      nodeId: terbaru.nodeId,
      packetRate: terbaru.packetRate,
      mean,
      std,
      z,
      timestamp: terbaru.timestamp,
    });
  }
}
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});