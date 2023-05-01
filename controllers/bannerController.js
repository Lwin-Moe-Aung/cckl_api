const db =  require("../models");
const Banner = db.banner;

//* get categoy by admins through navbarMenu ID
const getBanner = async (req, res) => {
    let banner = await Banner.findOne();
    
    return res.status(200).json(banner);
}

//* create navbarMenu by admins
const createBanner = async (req, res) => {
    await Banner.sync({ force: true });

    await Banner.create({
        image: req.body.image,
        e_title: req.body.e_title,
        m_title: req.body.m_title
    });
    return res.status(200).json('Banner successfully created!');
}


module.exports = { createBanner, getBanner }