const postRouter = require('./posts.js')
const authRouter = require('./auth.js')
const userRouter = require('./users.js')
const imageUploadRouter = require('./imageUpload.js')
const categoryRouter = require('./categories.js')

module.exports = {
    postRouter,
    authRouter,
    userRouter,
    imageUploadRouter,
    categoryRouter
}