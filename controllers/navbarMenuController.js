const db =  require("../models");
const slugify = require('slugify')
const NavbarMenu = db.navbar_menus;
const { Sequelize, Op } = require("sequelize");

//* get all categoies by admins
const getAllNavbarMenu = async (req, res) => {
    const results = await NavbarMenu.findAll({
        order: [['priority', 'ASC']]
    });
    return res.status(200).json(results);

}

//* get all categoies by admins
const getPublishedNavbarMenu = async (req, res) => {
    const results = await NavbarMenu.findAndCountAll({
        where: { published: true},
        order: [['priority', 'ASC']]
    });
    return res.status(200).json(results);

}

//* get categoy by admins through navbarMenu ID
const getNavbarMenu = async (req, res) => {
    let navbarMenu = await NavbarMenu.findOne({ where: { id: req.params.id }});
    if( navbarMenu == null ) throw new Error("NavbarMenu not found!");

    return res.status(200).json(navbarMenu);
}

//* create navbarMenu by admins
const createNavbarMenu = async (req, res) => {
    const data = await NavbarMenu.findOne({ where: { e_title: req.body.e_title}});
    if(data) throw new Error("NavbarMenu already exist!");
    await NavbarMenu.create({
        e_title: req.body.e_title,
        m_title: req.body.m_title,
        priority: req.body.priority,
        published: req.body.published
    });

    return res.status(200).json('NavbarMenu successfully created!');
    // throw new Error("User not found dd");
}

//* update navbarMenu by admins 
const updateNavbarMenu = async (req, res) => {

    const data = await NavbarMenu.findOne({ where: { e_title: req.body.e_title, id: {[Op.ne]: req.body.id}}});
    if(data) throw new Error("NavbarMenu already exist!");

    const navbarMenu = await NavbarMenu.findOne({ where: { id: req.body.id}});
    if(!navbarMenu) throw new Error("NavbarMenu doesn't exist!");

    navbarMenu.e_title = req.body.e_title;
    navbarMenu.m_title = req.body.m_title;
    navbarMenu.priority = req.body.priority;
    navbarMenu.published = req.body.published;
    navbarMenu.save();

    return res.status(200).json(navbarMenu);
}

//* delete navbarMenu by admins
const deleteNavbarMenu = async (req, res) => {
    await NavbarMenu.destroy({ where: {id: req.body.id}, force: true});
    return res.status(200).json("NavbarMenu deleted successfully!");

}

module.exports = { getPublishedNavbarMenu, getAllNavbarMenu, getNavbarMenu, createNavbarMenu, updateNavbarMenu, deleteNavbarMenu }