//Beirne
var express = require('express');
var path = require('path');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var phpExpress = require('php-express')({binPath:'C:/Users/chris/Desktop/DBserverPHP/PHP/php'});

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var createAccountRouter = require('./routes/createAccount');
var createSurveyRouter = require('./routes/createSurvey');
var answerSurveyRouter = require('./routes/answerSurvey');
var viewSurveyRouter = require('./routes/viewSurvey');
var testRouter = require('./routes/test');

var app = express();
app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.all(/.+\.php$/, phpExpress.router);

//allows javascript to query DB
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('PHPExpress app listening at http://%s:%s', host, port);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/createAccount', createAccountRouter);
app.use('/createSurvey', createSurveyRouter);
app.use('/answerSurvey', answerSurveyRouter);
app.use('/viewSurvey', viewSurveyRouter);
app.use('/test', testRouter);

module.exports = app;
