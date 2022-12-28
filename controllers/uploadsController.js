const { baseURL } = require('../config/urlConfig');

const upload = (req, res) => {
    console.log(req.file)
    // let imagePath = req.file.path.replace("/app/public", baseURL);
    const imagePath = `${baseURL}/uploads/users/${req.file.filename}`
    return res.json({
        imagePath
    });
}

module.exports = {upload}