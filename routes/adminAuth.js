const express = require('express')
const { login } = require("../controllers/adminAuthController.js");

const router = express.Router()
const { tryCatch } = require('../utils/tryCatch');

router.post("/login", tryCatch(login));

module.exports = router