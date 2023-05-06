// const http = require('http')
const express = require('express');
const app = express();
const createHttpError = require('http-errors');
// const httpServer = http.createServer(app);

require('dotenv').config();
const cors = require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//* routes
const userRouter = require('./routes/users.js')
const postRouter = require('./routes/posts.js')
const authRouter = require('./routes/auth.js')
const imageUploadRouter = require('./routes/imageUpload.js')
const categoryRouter = require('./routes/categories.js')
const navbarMenuRouter = require('./routes/navbarMenu.js')
const navbarSubMenuRouter = require('./routes/navbarSubMenu.js')
const logoRouter = require('./routes/logo.js')
const bannerRouter = require('./routes/banner.js')
const heroesTextRouter = require('./routes/heroesText.js')
const heroesPeopleRouter = require('./routes/heroesPeople.js')
const featureRouter = require('./routes/feature.js')
const mapRouter = require('./routes/map.js')

const forWebsiteRouter = require('./routes/forWebsite.js')

const adminAuthRouter = require('./routes/adminAuth.js')
const refreshTokenRouter = require('./routes/refreshToken.js')
const commentRouter = require('./routes/comments.js')
// const { postRouter, authRouter, userRouter, imageUploadRouter, categoryRouter } = require('./routes')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions.js')
const credentials = require('./middlewares/credentials.js')
const { logger } = require('./middlewares/logEvents');
const verifyJWT = require('./middlewares/verifyJWT')
const path = require('path')
require('dotenv').config();
const { PORT } = require('./config/urlConfig');
const errorHandler = require('./middlewares/errorHandler');

//* Handle options credentials check - before CORS!
//* and fetch cookies credentials requirement
app.use(credentials);
//* custom middleware logger
app.use(logger);
//* Cross Origin Resources Sharing
app.use(cors(corsOptions));

//* built-in middleware for json
app.use(express.json());

//* middleware for cookies
app.use(cookieParser());

//* Setting up the express static directory
app.use(express.static(path.join(__dirname, './public')));


//* api end points
app.use("/api/auth", authRouter)
app.use("/api/admin/auth", adminAuthRouter)
app.use("/api/refresh-access-token", refreshTokenRouter)
app.use("/api/admin/uploads", imageUploadRouter)
app.use("/api/admin/posts", postRouter)
app.use("/api/admin/categories", categoryRouter)
app.use("/api/admin/navbar-menus", navbarMenuRouter)
app.use("/api/admin/navbar-sub-menus", navbarSubMenuRouter)
app.use("/api/admin/logo", logoRouter)
app.use("/api/admin/banner", bannerRouter)
app.use("/api/admin/heroes-text", heroesTextRouter)
app.use("/api/admin/heroes-people", heroesPeopleRouter)
app.use("/api/admin/feature", featureRouter)
app.use("/api/admin/map", mapRouter)


app.use("/api/website", forWebsiteRouter)

app.use(verifyJWT); //* Jwt Auth middleware
app.use("/api/admin/users", userRouter)
app.use("/api/admin/posts-comments", commentRouter)

//* Error Handler
app.use(errorHandler);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          status: err.status || 500,
          message: err.message
      }
  })
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


