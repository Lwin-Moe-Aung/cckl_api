const bcrypt = require( "bcryptjs");
const jwt = require( "jsonwebtoken");
const db =  require("../models");
const User = db.users;

const login = async (req, res) => {
    let user = await User.findOne({ where: { email: req.body.email } });
    if(user == null || !user?.is_admin)  throw new Error("User not found!");

    const isPasswordCorrect = bcrypt.compareSync( req.body.password , user.password);
    if (!isPasswordCorrect) throw new Error("Wrong password!");

     // if correct password
     const accessToken = jwt.sign(
        { 
            "UserInfo": {
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_admin
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
   
    const refreshToken = jwt.sign(
        { "email": user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    );

    user.refresh_token = refreshToken;
    user.save();

    //Creates Secure Cookie with refresh token
    res
        .cookie('jwt', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000
    });
    const { password, refresh_token, id,  ...data } = user.dataValues;
    
    return res.status(200).json({data, accessToken});
}


module.exports = {login}
