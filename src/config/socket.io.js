const jwt = require('jsonwebtoken');

const configSocketIOAuth = (io) =>
    io.use((socket, next) => {
        // Access the handshake data to retrieve the token
        const token = socket.handshake.query.token;

        // Verify the token
        jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error'));
            }

            // Attach the decoded user information to the socket
            socket.user = decoded;
            next();
        });
    });

module.exports = { configSocketIOAuth };
