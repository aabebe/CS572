var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gradesRouter = require('./routes/grades');
const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');


var app = express();
const logDirectory = path.join(__dirname, 'log');

//ensuring log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
// view engine setup
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grades', gradesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
