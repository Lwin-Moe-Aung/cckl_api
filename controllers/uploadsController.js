const { baseURL } = require('../config/urlConfig');

const uploadProfile = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${baseURL}/uploads/users/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}

const uploadPostImage = (req, res) => {
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${baseURL}/uploads/posts/${req?.file?.filename}`
    return res.json({
        imagePath
    });
}

module.exports = {uploadProfile, uploadPostImage}