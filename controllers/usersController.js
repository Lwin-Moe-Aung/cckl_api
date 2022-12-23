const bcrypt = require( "bcryptjs");
const { baseURL } = require('../config/urlConfig');
const db =  require("../models");
const User = db.users;

// get all user lists from admin
const getAllUsers = async (req, res) => {
    return res.send({
        data: res.paginatedResults,
        totalPages: res.totalPages
    });
}

const getUser = (req, res) => {
    res.send("get User");
}

// create new user by admin
const createUser = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(user != null) return res.status(409).json("Email already exists!");

    //Hash the password and create a user
    const salt = await bcrypt.genSaltSync(10);
    const usr = {
        username : req.body.username,
        email : req.body.email,
        password : await bcrypt.hashSync(req.body.password, salt),
        is_admin : req.body.is_admin,
        photo  :  req.body.photo
    };

    User.create(usr).then(data => {
        const {password, ...resData} = usr;
        return res.status(201).json(resData);
    }).catch(err => {
        return res.status(403).json(err)
    })
}

// update user Profile
const updateUser = async (req, res) => {
    let user = await User.findOne({ where: { id: req.body.id } })
    if(user == null ) return res.status(400).json("Bad request:  ID does not match data from users table!");

    if(req.body.new_password != "") var salt = await bcrypt.genSaltSync(10);
    try{
        user.username = req.body.username,
        user.email = req.body.email,
        user.password = req.body.new_password != "" ? await bcrypt.hashSync(req.body.new_password, salt) : user.password,
        user.is_admin = req.body.is_admin,
        user.photo  =  req.body.photo
        user.save();
        const {password, refresh_token, ...resData} = user.dataValues;
        return res.status(201).json(resData)
    }catch(err){
        return res.status(403).json(err)
    }
}

// delete user by admin
const deleteUser = async (req, res) => {
    try{
        await User.destroy({
            where: {
              id: req.body.user_id
            },
            force: true
        });
        return res.status(201).json("Delete Success")
    }catch(err){
        return res.status(403).json(err)
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser }