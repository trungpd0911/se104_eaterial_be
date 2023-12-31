const jwt = require('jsonwebtoken');
require('dotenv').config();

// verify token is check if the token is valid
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // const refreshToken = req.cookies.refreshToken;
        if (token) {
            const accessToken = token.split(" ")[1];
            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            if (!decoded) {
                return res.status(401).json("You're not authenticated");
            }
            req.user = decoded;
            next();
        } else {
            return res.status(401).json("You're not authenticated");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

// verify token and admin is check if the user is admin
const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin !== true) {
            return res.status(403).json("Access denied");
        }
        next();
    });
}

// verify token and authorization is check if the user is the same as the user or admin that is logged in
const verifyTokenAdminOrCurrentUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin === true) {
            next();
        } else {
            return res.status(403).json("Access denied");
        }
    });
}

// verify token and authorization is check if the user is the same as the user that is logged in
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id) {
            next();
        } else {
            return res.status(403).json("Access denied");
        }
    });
}

const verifyTokenWs = (ws, req) => {
    try {
        const accessToken = req.url.split('access_token=')[1].split('&')[0];
        const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
        if (!decoded) {
            ws.close(4001, 'Unauthorized');
        }
        return ws.user = decoded;
    } catch (err) {
        ws.close(4001, 'Unauthorized');
    }
}

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenAdminOrCurrentUser,
    verifyTokenAndAuthorization,
    verifyTokenWs
};