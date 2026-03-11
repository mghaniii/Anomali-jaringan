// 1. Mengimpor library socket.io-client
const io = require("socket.io-client");

// 2. Menghubungkan agent ke server Socket.IO di http://localhost:3000
const socket = io("http://localhost:3000");

// 3. Fungsi untuk membuat data "trafik jaringan" palsu (simulasi)
function buatDataTrafik() {
  const nodeId = "Node-1"; 
  const timestamp = Date.now();
  const packetRateBase = Math.floor(Math.random() * 200); 


  const isTimeForAnomaly = Math.floor(timestamp / 10000) % 2 === 0;
  
  if (isTimeForAnomaly && Math.random() < 0.3) {
  
    return { nodeId, packetRate: packetRateBase + 1200, timestamp }; 
  }

  return { nodeId, packetRate: packetRateBase, timestamp };
}


setInterval(() => {
  const data = buatDataTrafik();
  socket.emit("log", data); // kirim event bernama "log" ke server
  console.log("Mengirim log:", data);
}, 2000);
