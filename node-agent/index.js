const io = require("socket.io-client");
const socket = io("http://localhost:3000");



function buatDataTrafik() {
  const packetRate = Math.floor(Math.random() * 200); 
  
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

setInterval (()=> {
    const data = buatDataTrafik();
     socket.emit("log", data); // kirim event bernama "log" ke server
  console.log("Mengirim log:", data);


}, 1000)
