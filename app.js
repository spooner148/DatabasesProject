//Beirne
var express = require('express');
var path = require('path');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var createAccountRouter = require('./routes/createAccount');
var createSurveyRouter = require('./routes/createSurvey');
var answerSurveyRouter = require('./routes/answerSurvey');
var viewSurveyRouter = require('./routes/viewSurvey');

var sql = mysql.createConnection({
//  connectionLimit:10,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '4710team8@gmail.com',
    pass: 'superadmin'
  }
});

var app = express();

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

module.exports = app;
