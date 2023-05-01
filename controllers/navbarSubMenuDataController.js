const db =  require("../models");
const slugify = require('slugify')
const NavbarSubMenu = db.navbar_sub_menus;
const NavbarMenu = db.navbar_menus;

const Post = db.posts;
const { Sequelize, Op } = require("sequelize");



//* get all categoies by admins
const getAllNavbarSubMenuData = async (req, res) => {
    const results = await NavbarSubMenu.findAll({include: NavbarMenu});
    return res.status(200).json(results);
}

//* get categoy by admins through navbarMenu ID
const getNavbarSubMenuData = async (req, res) => {
    let data = await NavbarSubMenu.findOne({ 
        where: { id: req.params.id },
        include: NavbarMenu
    });
    if( data == null ) throw new Error("NavbarSubMenu not found!");

    return res.status(200).json(data);
}

//* create navbarMenu by admins
const createNavbarSubMenuData = async (req, res) => {
    await NavbarSubMenu.create({
        parent_menu_id: req.body.parent_menu_id,
        e_title: req.body.e_title,
        m_title: req.body.m_title,
        e_description: req.body.e_description,
        m_description: req.body.m_description,
    });
    return res.status(200).json('NavbarSubMenu successfully created!');
    // throw new Error("User not found dd");
}

//* update navbarMenu by admins 
const updateNavbarSubMenuData = async (req, res) => {
    const navbarSubMenu = await NavbarSubMenu.findOne({ where: { id: req.body.id}});
    if(!navbarSubMenu) throw new Error("NavbarSubMenu doesn't exist!");
    
    navbarSubMenu.parent_menu_id = req.body.parent_menu_id;
    navbarSubMenu.e_title = req.body.e_title;
    navbarSubMenu.m_title = req.body.m_title;
    navbarSubMenu.e_description = req.body.e_description;
    navbarSubMenu.m_description = req.body.m_description;
    navbarSubMenu.save();

    return res.status(200).json(navbarSubMenu);
}

//* delete navbarMenu by admins
const deleteNavbarSubMenuData = async (req, res) => {
    await NavbarSubMenu.destroy({ where: {id: req.body.id}, force: true});
    return res.status(200).json("NavbarSubMenu deleted successfully!");

}

module.exports = { getAllNavbarSubMenuData, getNavbarSubMenuData, createNavbarSubMenuData, updateNavbarSubMenuData, deleteNavbarSubMenuData};
