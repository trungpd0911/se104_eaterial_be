const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const body = req.body;
        const response = await authService.register(body);
        res.status(response.statusCode).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try {
        const response = await authService.login(req.body);
        if (response.statusCode === 200) {
            res.cookie("refreshToken", response.data.refreshToken,
                {
                    httpOnly: true,
                    // secure: false, // deploy: true
                    secure: true,
                    path: "/",
                    sameSite: "strict",
                });
            const { refreshToken, ...info } = response.data;
            res.status(response.statusCode).json(info);
        }
        else {
            res.status(response.statusCode).json(response);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        const response = await authService.logout(req.body);
        res.status(response.statusCode).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
}

const refreshToken = async (req, res) => {
    try {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        const response = await authService.refreshToken(refreshToken);
        const newRefreshToken = response.data.refreshToken;
        res.cookie("refreshToken", newRefreshToken,
            {
                httpOnly: true,
                secure: false, // deploy: true
                // When set to true, the cookie will only be sent over HTTPS
                path: "/",
                sameSite: "strict",
                // When set to strict, the cookie will only be sent along with requests
            });
        const { refreshToken: _, ...info } = response.data;
        res.status(response.statusCode).json(info); 9
    } catch (err) {
        res.status(500).json(err);
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json('Password reset email sent.');
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    register,
    login,
    logout,
    refreshToken,
    forgotPassword,
}