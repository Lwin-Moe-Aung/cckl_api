const multer = require('multer');
console.log("hello this is user profile image uploader");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/uploads/users`);
    },
    filename: (req, file, cb) => {
        console.log("aaaaaaaaaaaaassssssssssss");
        console.log(req);
        console.log(file);
        console.log("aaaaaaaaaaaaassssssssssss");

        let lastIndex = file.originalname.lastIndexOf(".");
        // get the original extension of the file
        let extension = file.originalname.substring(lastIndex);
        // Create the file on the server
        cb(null, `profile-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage });

module.exports = upload;

