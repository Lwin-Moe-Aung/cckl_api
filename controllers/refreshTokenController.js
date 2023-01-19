const jwt = require('jsonwebtoken');
const db =  require("../models");
const User = db.users;

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ where: { refresh_token: refreshToken} })
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "email": decoded.email,
                        "is_admin": foundUser.is_admin,
                        "id": foundUser.id

                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            
            const { password, refresh_token,  ...data } = foundUser.dataValues;
      
            return res.status(200)
                .json({data, accessToken});

        }
    );
}

module.exports = { handleRefreshToken }