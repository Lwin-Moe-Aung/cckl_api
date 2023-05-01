// const { baseURL } = require('../config/urlConfig');
const db =  require("../models");
const Logo = db.logo;
const uploadProfile = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${process.env.BASE_URL}/uploads/users/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}

const uploadPostImage = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${process.env.BASE_URL}/uploads/posts/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}

const uploadLogoImage = async (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${process.env.BASE_URL}/uploads/Logo/${req?.file?.filename}`
    await Logo.sync({ force: true });
    await Logo.create({image:imagePath});
    return res.json({
        imagePath
    });
}

const uploadBannerImage = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${process.env.BASE_URL}/uploads/banners/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}

const uploadPeopleImage = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${process.env.BASE_URL}/uploads/people/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}
module.exports = {uploadPeopleImage, uploadBannerImage, uploadProfile, uploadPostImage, uploadLogoImage}