module.exports = (io, socket) => {

  const room = 'user:' + socket.authUser.sub;
  socket.join(room);

  socket.on('message:send', (text) => {
    
    text = text.trim();
   
    io.to(room).emit('message:new', {
      user: socket.authUser.username,
      text,
      sentAt: Date.now(),
    });
  });

  socket.on('typing:update', (text) => {
    socket.to(room).emit('typing:live', {
      id: socket.id,
      user: socket.authUser.username,
      text,
    });
  });

 
  socket.on('disconnect', () => {
    socket.to(room).emit('typing:live', { id: socket.id, text: '' });
  });
};
