const db =  require("../models");
const Logo = db.logo;
const { Sequelize, Op } = require("sequelize");

//* get all categoies by admins
const getLogo = async (req, res) => {
    const logo = await Logo.findOne();
    return res.send(logo);
}

module.exports = { getLogo}