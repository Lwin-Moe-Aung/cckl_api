const { baseURL } = require('../config/urlConfig');

const upload = (req, res) => {
    let imagePath = req.file.path.replace("/app/public", baseURL);
    return res.json({
        imagePath
    });
}

module.exports = {upload}