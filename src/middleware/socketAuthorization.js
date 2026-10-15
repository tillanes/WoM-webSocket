const jwt = require('jsonwebtoken')


module.exports = (socket, next) => {
    console.log(`Authorize socket JWT`)
    try {
        const authHeader = socket.handshake.headers['authorization'] || ''
        const token = authHeader.split(' ')[1]

        const user = jwt.verify(token, process.env.JWT_SECRET)
        socket.authUser = user

        console.log(`Token valid for user ${user.sub} ${user.username}`)
        next()
    } catch (error) {
        console.log(error.message)
        if (error.name === 'TokenExpiredError') {
            const err = new Error("Token expired")
            err.data = { status: 401 }
            return next(err)
        }
        next(new Error("Authorization failed"))
    }
}
