const WARNING_BEFORE_EXPIRY_MS = 60 * 1000

module.exports = (socket) => {

  const { exp } = socket.authUser

  const delay = exp * 1000 - WARNING_BEFORE_EXPIRY_MS - Date.now()

  socket.expiryTimer = setTimeout(() => {
    console.log(`Token expiring soon for user ${socket.authUser.username}`)
    socket.emit('auth:error', {
      status: 401,
      message: 'Token expires in 1 minute',
    })
  }, delay)

  socket.on('disconnect', () => {
    clearTimeout(socket.expiryTimer)
  })
}
