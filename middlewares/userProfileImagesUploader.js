const multer = require('multer');
console.log(__dirname);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/uploads/users`);
    },
    filename: (req, file, cb) => {
        let lastIndex = file.originalname.lastIndexOf(".");
        // get the original extension of the file
        let extension = file.originalname.substring(lastIndex);
        // Create the file on the server
        cb(null, `profile-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage });

module.exports = upload;

