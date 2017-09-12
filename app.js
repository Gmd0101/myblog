var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongodb = require('mongodb');

var crypto = require('crypto');



var index = require('./routes/index');
var users = require('./routes/users');



var app = express();
//配置session
app.use(session({
  secret: 'gmd',
//设置cookie的过期时间
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave:false,
  // store:new Mongos,
  saveUninitialized:true
}));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));

//视图引擎，解析ejs
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// index(app);
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
