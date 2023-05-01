const db =  require("../models");
const HeroesText = db.heros_text;

//* get categoy by admins through navbarMenu ID
const getHeroesText = async (req, res) => {
    let banner = await HeroesText.findOne();
    
    return res.status(200).json(banner);
}

//* create navbarMenu by admins
const createHeroesText = async (req, res) => {
    await HeroesText.sync({ force: true });

    await HeroesText.create({
        e_title: req.body.e_title,
        m_title: req.body.m_title,
        e_description: req.body.e_description,
        m_description: req.body.m_description
    });
    
    return res.status(200).json('HeroesText successfully created!');
}


module.exports = { createHeroesText, getHeroesText }