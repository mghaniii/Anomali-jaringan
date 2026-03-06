// 1. Mengimpor library socket.io-client
const io = require("socket.io-client");

// 2. Menghubungkan agent ke server Socket.IO di http://localhost:3000
const socket = io("http://localhost:3000");

// 3. Fungsi untuk membuat data "trafik jaringan" palsu (simulasi)
function buatDataTrafik() {
  const packetRate = Math.floor(Math.random() * 200); 
  const timestamp = Date.now(); 
  const nodeId = "Node-1";  // pastikan ini dideklarasikan dulu

  // simulasikan lonjakan besar tiap 10 detik
  const now = Date.now();
  if (Math.floor(now / 10000) % 2 === 0) {
    // setiap 10 detik sekali
    if (Math.random() < 0.3) {
      // 30% kemungkinan
      return { nodeId, packetRate: packetRate + 300, timestamp }; // bikin lonjakan besar
    }
  }

  // jika tidak anomali, kirim data normal
  return { nodeId, packetRate, timestamp };
} 


// 4. Setiap 1 detik, kirim data ke server
setInterval(() => {
  const data = buatDataTrafik();
  socket.emit("log", data); // kirim event bernama "log" ke server
  console.log("Mengirim log:", data);
}, 2000);
