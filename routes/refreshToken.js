const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');

//* try catch
const { tryCatch } = require('../utils/tryCatch');

router.get('/', handleRefreshToken);


module.exports = router;