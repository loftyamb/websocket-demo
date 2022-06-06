const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  socket.on('clientMsg', (data) => {
    console.log(data);
    io.emit('serverMsg', data);
  })
  socket.on('connect_error', (reason) => {
    console.log(reason);
  })
});

httpServer.listen(3000, () => {
  console.log('server is listening on port 3000');
});