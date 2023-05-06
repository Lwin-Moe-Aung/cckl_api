const bcrypt = require( "bcryptjs");
const { baseURL } = require('../config/urlConfig');
const db =  require("../models");
const Logo = db.logo;
const NavbarMenu = db.navbar_menus;
const NavbarSubMenu = db.navbar_sub_menus;
const Banner = db.banner;
const HeroesText = db.heros_text;
const HeroesPeople = db.heros_people;
const Feature = db.feature;
const Map = db.map;


// get navbar data (logo , navbar menu, sub menu)
const getNavbarDataE = async (req, res) => {
    return res.send({
        "navbar": await NavbarMenu.findAll({
            where: { published: true},
            order: [['priority', 'ASC']],
            attributes: ['id', ['e_title','title'], 'priority'],
            include:[{model: NavbarSubMenu,  attributes: ['id', ['e_title', 'title'], 'parent_menu_id']}],
        }),
        "logo": await Logo.findOne(),
        "banner": await Banner.findOne({attributes: ['id', ['e_title','title'], 'image']}),
        "heroesText": await HeroesText.findOne({attributes: ['id', ['e_title','title'], ['e_description', 'description']]}),
        "heroesPeople": await HeroesPeople.findAll({attributes: ['id', 'image', ['e_name','name'],  ['e_job_title', 'job_title'], 'fb_link']}),
        "feature": await Feature.findAll({attributes: ['id', ['e_title','title'], ['e_description', 'description'], 'icon', 'color']}),
        "map": await Map.findOne(),

    });
}

// get navbar data (logo , navbar menu, sub menu)
const getNavbarDataM = async (req, res) => {
    return res.send({
        "navbar": await NavbarMenu.findAll({
            where: { published: true},
            order: [['priority', 'ASC']],
            attributes: ['id', ['m_title','title'], 'priority'],
            include:[{model: NavbarSubMenu,  attributes: ['id', ['m_title', 'title'], 'parent_menu_id']}],
        }),
        "logo": await Logo.findOne(),
        "banner": await Banner.findOne({attributes: ['id', ['m_title','title'], 'image']}),
        "heroesText": await HeroesText.findOne({attributes: ['id', ['m_title','title'], ['m_description', 'description']]}),
        "heroesPeople": await HeroesPeople.findAll({attributes: ['id', 'image', ['m_name','name'],  ['m_job_title', 'job_title'], 'fb_link']}),
        "feature": await Feature.findAll({attributes: ['id', ['m_title','title'], ['m_description', 'description'], 'icon', 'color']}),
        "map": await Map.findOne(),
    });
}

// get navbar data (logo , navbar menu, sub menu)
const getDetailE = async (req, res) => {
    const data = await NavbarSubMenu.findOne({
        where: { id: req.params.id},
        attributes: ['id', ['e_title','title'], ['e_description','description'], 'parent_menu_id']
    });
    if(data == null) return res.send("noData");
    return res.send(data);
}

// get navbar data (logo , navbar menu, sub menu)
const getDetailM = async (req, res) => {
    const data = await NavbarSubMenu.findOne({
        where: { id: req.params.id},
        attributes: ['id', ['m_title','title'], ['m_description','description'], 'parent_menu_id']
    });
    if(data == null) return res.send("noData");
    return res.send(data);
}

module.exports = { getNavbarDataE, getNavbarDataM, getDetailE, getDetailM}