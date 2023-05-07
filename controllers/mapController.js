const db =  require("../models");
const Map = db.map;



//* get categoy by admins through map
const getMap = async (req, res) => {
    let feature = await Map.findOne();
    if( feature == null ) throw new Error("Map not found!");

    return res.status(200).json(feature);
}

//* create map by admins
const createMap = async (req, res) => {
    await Map.sync({ force: true });
    await Map.create({
        map: req.body.map,
    });
    return res.status(200).json('Map successfully created!');
}


module.exports = { getMap, createMap}