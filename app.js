var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');//----------------Lab7, task 6, step 7

// var apiRounter = require('api-router');
// mongodb connection via mongoose - lab4, task3, step9
require('./api_server/db');

// Router
const appRouter = require('./app_server/routes/app_router');

//lab5, task 2, added apiRouter
const apiRouter = require('./api_server/routes/api_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRouter); //----------------Lab2, task 4

app.use('/api/v1', apiRouter); //----------------Lab5, task 3

app.use(passport.initialize());//----------------Lab7, task 6, step 7

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


module.exports = app;
