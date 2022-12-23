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

// routes
const postRouter = require('./routes/posts.js')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/users.js')
const imageUploadRouter = require('./routes/imageUpload.js')

const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions.js')
const credentials = require('./middlewares/credentials.js')
const { logger } = require('./middlewares/logEvents');
const verifyJWT = require('./middlewares/verifyJWT')
const path = require('path')
require('dotenv').config();
const { PORT } = require('./config/urlConfig')

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// custom middleware logger
app.use(logger);
// Cross Origin Resources Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));
app.use("/api/auth", authRouter)

app.use(verifyJWT);
app.use("/api/uploads", imageUploadRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)


app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.json(__dirname, 'views', '404.html'));
  }else if (req.accepts('json')) {
    res.json({ 'error' : '404 Not Found' });
  }else {
    res.type('txt').send('404 Not Found');
  }
});
//* Catch HTTP 404 
app.use((req, res, next) => {
  next(createHttpError(404));
})

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          status: err.status || 500,
          message: err.message
      }
  })
});
// Setting up the express static directory

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


