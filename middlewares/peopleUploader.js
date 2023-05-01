const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/uploads/people`);
    },
    filename: (req, file, cb) => {
        console.log(file)
        let lastIndex = file.originalname.lastIndexOf(".");
        // get the original extension of the file
        let extension = file.originalname.substring(lastIndex);
        // Create the file on the server
        cb(null, `people-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage });


module.exports = upload;

