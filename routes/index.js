const postRouter = require('./posts.js')
const authRouter = require('./auth.js')
const userRouter = require('./users.js')
const imageUploadRouter = require('./imageUpload.js')
const categoryRouter = require('./categories.js')
const navbarMenuRouter = require('./navbarMenu.js')
const navbarSubMenuRouter = require('./navbarSubMenu.js')
const logoRouter = require('./logo.js')
const heroesTextRouter = require('./heroesText.js')
const heroesPeopleRouter = require('./heroesPeople.js')
const forWebsiteRouter = require('./forWebsite.js')


module.exports = {
    postRouter,
    authRouter,
    userRouter,
    imageUploadRouter,
    categoryRouter,
    navbarMenuRouter,
    navbarSubMenuRouter,
    logoRouter,
    heroesTextRouter,
    heroesPeopleRouter,
    forWebsiteRouter
}