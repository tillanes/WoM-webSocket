require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const socketAuthorization = require('./middleware/socketAuthorization');
const messageHandler = require('./handlers/messageHandler');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.use(socketAuthorization);

let num = 0;
io.on('connection', (socket) => {
  console.log(socket.rooms)
  num += 1;
  console.log('a user connected: ' + num + ' (' + socket.authUser.username + ')');
  messageHandler(io, socket);
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
