const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();

const wsServer = new WebSocketServer({
  httpServer: server
});

server.listen(3000, function() {
  console.log('server is listening on port 3000');
});

const connectionPool = [];
wsServer.on('request', (req) => {
  const connection = req.accept();
  console.log('connection accepted');
  connectionPool.push(connection);
  connection.on('message', (msg) => {
    console.log(`received data: ${msg.utf8Data}`);
    connectionPool.forEach(value => {
      value.send(msg.utf8Data)
    })
  });
  connection.on('close', (reasonCode, desc) => {
    console.log(`the connection is closed by ${reasonCode}:${desc}`);
  })
})