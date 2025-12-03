// 1. Mengimpor library socket.io-client
const io = require("socket.io-client");

// 2. Menghubungkan agent ke server Socket.IO di http://localhost:3000
const socket = io("http://localhost:3000");

// 3. Fungsi untuk membuat data "trafik jaringan" palsu (simulasi)
function buatDataTrafik() {
  const packetRate = Math.floor(Math.random() * 200); 
  // nilai acak antara 0–199

  const timestamp = Date.now(); 
  // waktu sekarang dalam bentuk milidetik sejak 1970

  const nodeId = "Node-1"; 
  // identitas node, nanti kalau banyak node bisa diganti Node-2, dst

  return { nodeId, packetRate, timestamp };
}

// 4. Setiap 1 detik, kirim data ke server
setInterval(() => {
  const data = buatDataTrafik();
  socket.emit("log", data); // kirim event bernama "log" ke server
  console.log("Mengirim log:", data);
}, 1000);
