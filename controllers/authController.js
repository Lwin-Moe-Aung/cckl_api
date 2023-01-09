const bcrypt = require( "bcryptjs");
const jwt = require( "jsonwebtoken");
const db =  require("../models");
const User = db.users;

const register = async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });
    if(user != null) return res.status(409).json("Email already exists!");

    //Hash the password and create a user
    const salt = await bcrypt.genSaltSync(10);
    var usr = {
        username : username,
        email : email,
        password : await bcrypt.hashSync(password, salt),
        is_admin : false
    };
    const created_user = await User.create(usr);
    res.status(201).json(created_user);
    // console.log(user);
}

const login = (req, res) => {
    console.log(req.body);
    //validation
    //do something
    User.findOne({ where: { email: req.body.email } })
    .then( user => {
        if(user == null)  return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync( req.body.password , user.password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

        // correct password
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": user.username,
                    "email": user.email,
                    "is_admin": user.is_admin
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
       
        const refreshToken = jwt.sign(
            { "email": user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        );
        
        user.update({
            refresh_token: refreshToken
        }).then( data =>{
            console.log("refresh token updated" + data)
        }).catch(error =>{
            console.log(error);
        });
        
        //Creates Secure Cookie with refresh token
        res
            .cookie('jwt', refreshToken, { 
                httpOnly: true, 
                secure: true, 
                sameSite: 'None', 
                maxAge: 24 * 60 * 60 * 1000
        });
        const { password, refresh_token, id,  ...data } = user.dataValues;
      
        return res.status(200)
            .json({data, accessToken});
    })
    .catch( error => {
        return res.status(500).json(error);
    });

}

const logout = async (req, res) => {
    // on client, also delete the accessToken
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);// No content
    const refreshToken = cookies.jwt;

    //Is refreshToken in db?
    User.findOne({ where: { refresh_token: refreshToken } })
    .then(user => {
        if(user == null ) res.status(404).json("User not found!");
        user.update({
            refresh_token: null
        }).catch(error =>{
            console.log(error);
        });
    })
    .catch( error => {
        console.log(error);
    });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = {register,login,logout}