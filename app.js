var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
var favicon = require('serve-favicon')
const { signup, signin, logout } = require('./controllers/authController');


var indexRouter = require('./routes/index');
var facultyRouter = require('./routes/faculty');
var studentRouter = require('./routes/student');
var getRegister = require('./routes/register');
var getLogin = require('./routes/login');

var app = express();
// Serve Favicon
console.log(__dirname);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

var mongoose = require('mongoose');

var DB_LINK = 'mongodb+srv://saakshi:qwop1290@cluster0.fmyko.mongodb.net/Faculty_Connect_MS_Engage?retryWrites=true&w=majority';
mongoose
  .connect(
    DB_LINK, 
    { useNewUrlParser: true , useUnifiedTopology: true}
  );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests created from this IP, please try again after a minute"
});

app.use(limiter);

app.post('/auth/signup', signup)
app.post('/auth/login',signin)

// app.use(protectRoute);
// app.use(isLoggedIn);

app.use('/', indexRouter);
app.use('/faculty', facultyRouter);
app.use('/student',studentRouter);
app.use('/signup',getRegister);
app.use('/signin',getLogin);
app.get("/logout",logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
