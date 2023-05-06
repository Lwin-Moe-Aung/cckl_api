const db =  require("../models");
const Feature = db.feature;

//* get all categoies by admins
const getAllFeature = async (req, res) => {
    const results = await Feature.findAll();
    return res.status(200).json(results);

}


//* get categoy by admins through navbarMenu ID
const getFeature = async (req, res) => {
    let feature = await Feature.findOne({ where: { id: req.params.id }});
    if( feature == null ) throw new Error("Feature not found!");

    return res.status(200).json(feature);
}

//* create navbarMenu by admins
const createFeature = async (req, res) => {
    await Feature.create({
        e_title: req.body.e_title,
        m_title: req.body.m_title,
        color: req.body.color,
        icon: req.body.icon,
        e_description: req.body.e_description,
        m_description: req.body.m_description,
        
    });
    return res.status(200).json('Feature successfully created!');
}

//* update navbarMenu by admins 
const updateFeature = async (req, res) => {
    const feature = await Feature.findOne({ where: { id: req.body.id}});
    if(!feature) throw new Error("Feature doesn't exist!");

    feature.e_title = req.body.e_title;
    feature.m_title = req.body.m_title;
    feature.color = req.body.color;
    feature.icon = req.body.icon;
    feature.e_description = req.body.e_description;
    feature.m_description = req.body.icon;
    feature.save();

    return res.status(200).json(feature);
}

//* delete navbarMenu by admins
const deleteFeature = async (req, res) => {
    await Feature.destroy({ where: {id: req.body.id}, force: true});
    return res.status(200).json("Feature deleted successfully!");

}

module.exports = { getAllFeature, getFeature, createFeature, updateFeature, deleteFeature }