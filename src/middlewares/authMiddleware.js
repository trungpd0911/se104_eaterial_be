const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        // const refreshToken = req.cookies.refreshToken;
        if (token) {
            const accessToken = token.split(" ")[1];
            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            if (!decoded) {
                res.status(401).json("You're not authenticated");
            }
            req.user = decoded;
            next();
        } else {
            res.status(401).json("You're not authenticated");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "admin") {
            res.status(403).json("Access denied");
        }
        next();
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
};

