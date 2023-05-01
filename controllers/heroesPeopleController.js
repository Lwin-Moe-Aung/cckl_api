const db =  require("../models");
const slugify = require('slugify')
const HeroesPeople = db.heros_people;

//* get all categoies by admins
const getAllHeroesPeople = async (req, res) => {
    const data = await HeroesPeople.findAll();
    return res.status(200).json(data);
}

//* get categoy by admins through category ID
const getHeroesPeople = async (req, res) => {
    let data = await HeroesPeople.findOne({ where: { id: req.params.id }});
    if( data == null ) throw new Error("HeroesPeople not found!");

    return res.status(200).json(data);
}

//* create category by admins
const createHeroesPeople = async (req, res) => {
    await HeroesPeople.create({
        e_name: req.body.e_name,
        m_name: req.body.m_name,
        e_job_title: req.body.e_job_title,
        m_job_title: req.body.m_job_title,
        image: req.body.image,
        fb_link: req.body.fb_link,
    });
    return res.status(200).json('HeroesPeople successfully created!');
    // throw new Error("User not found dd");
}

//* update category by admins 
const updateHeroesPeople = async (req, res) => {
    const heroesPeople = await HeroesPeople.findOne({ where: { id: req.body.id}});
    if(!heroesPeople) throw new Error("HeroesPeople doesn't exist!");

    heroesPeople.e_name = req.body.e_name;
    heroesPeople.m_nmae = req.body.m_nmae;
    heroesPeople.e_job_title = req.body.e_job_title;
    heroesPeople.m_job_title = req.body.m_job_title;
    heroesPeople.image = req.body.image;
    heroesPeople.fb_link = req.body.fb_link;
    heroesPeople.save();

    return res.status(200).json(heroesPeople);
}

//* delete category by admins
const deleteHeroesPeople = async (req, res) => {
    await HeroesPeople.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("HeroesPeople deleted successfully!");

}

module.exports = { getAllHeroesPeople, getHeroesPeople, createHeroesPeople, updateHeroesPeople, deleteHeroesPeople}