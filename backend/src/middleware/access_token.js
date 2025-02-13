const jwt = require("jsonwebtoken")
const db = require("../../config/db.config")
const User = db.user
const generateToken = require("../middleware/generate_token")
const refresh_secret_key = process.env.REFRESH_SECRET_KEY

exports.generate_access_token = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Access token expired, refresh token not found' });
    }

    try {
        const decodedRefreshToken = jwt.verify(refreshToken, refresh_secret_key);
        const user = await User.findOne({ where: { refreshToken } });
        //console.log(user)

        if (!user || !decodedRefreshToken) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        if (Date.now() > user.refreshToken_Expiration) {
            return res.status(403).json({ message: "Please login" })
        }

        const access_token_new = generateToken.generateAccessToken(user);

        return res.status(200).json({ access_token: access_token_new, });

    } catch (error) {
        console.error('generate Token error:', error.message);
        return res.status(500).json({ 
            status : false,
            message: 'Internal Server error' 
        });
    }
}