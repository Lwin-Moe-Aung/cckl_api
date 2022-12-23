const jwt = require('jsonwebtoken');
const db =  require("../models");
const User = db.users;

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;

    User.findOne({ where: { refresh_token } })
    .then( foundUser => {
        if (!foundUser) return res.sendStatus(403); //Forbidden 
        // evaluate jwt 
        jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": decoded.email,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' }
                );
                res.json( accessToken )
            }
        );
    })
    .catch( error => {
        return res.status(500).json(error);
    });

   
}

module.exports = { handleRefreshToken }