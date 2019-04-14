//Beirne, Spooner

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var sql = mysql.createPool({
  connectionLimit:2,
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

router.get('/', function(req,res){
  var check = req.cookies.user;
  if (check == null || check== "unknown")
    res.redirect('/');
  else
    res.sendFile('createSurveyStart.html', {root: './public/'});
});

router.post('/', function(req, res, next) {
  res.sendFile('createSurveyStart.html', {root: './public/'});
});

router.post('/addSurvey', function(req,res,next){
  var email = req.cookies.user;
  var title = req.body.title;
  var desc = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  sql.query('INSERT INTO survey (Title, Description, Start, End, Creater_Email) VALUES (?,?,?,?,?)', [title, desc, start, end, email] , function (error, results, fields) {
    if (error) throw error;
    res.cookie('sid', results.insertId).redirect('/createSurvey/questions');
  });
});

router.get('/questions', function(req, res, next){
  var check = req.cookies.user;
  var check2 = req.cookies.sid;
  if (check == null || check== "unknown" ||check2 == null)
    res.clearCookie('sid').redirect('/');
  else
    res.sendFile('createSurveyQuestions.html', {root: './public/'});
});

router.post('/addQuestion', function(req, res, next) {
  var questionType = req.body.type;
  var questionDesc = req.body.question;
  var sid = req.cookies.sid;
  sql.query('INSERT INTO question (SID, question, type) VALUES (?,?,?)', [sid, questionDesc, questionType], function (error, results, fields){
    if (error) throw error;
    res.redirect('/createSurvey/questions');
  });
});

router.get('/participants', function(req, res, next){
  var check = req.cookies.user;
  var check2 = req.cookies.sid;
  if (check == null || check== "unknown" ||check2 == null)
    res.clearCookie('sid').redirect('/');
  else
    res.sendFile('createSurveyParticipants.html', {root: './public/'});
});

router.post('/addParticipant', function(req, res, next) {
  //res.sendFile('Login.html', {root: './public/'  });
  var email = req.body.email;
  var sid = req.cookies.sid;
  sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
    if (error) throw error;
    if (results[0].emailCheck == 0)
      res.redirect(307, '/createSurvey/addParticipant/new');
    else
      res.redirect(307, '/createSurvey/addParticipant/exists');
  });
});

router.post('/addParticipant/new', function(req, res, next) {
  var email = req.body.email;
  var sid = req.cookies.sid;
  sql.query('INSERT INTO person (email) VALUES (?); INSERT INTO invited (email, SID) VALUES (?,?)', [email, email, sid], function (error, results, fields){
    if (error) throw error;});
  transporter.sendMail({
    from: '4710team8@gmail.com',
    to: email,
    subject: 'You are Invited to take a survey with us!',
    text: 'http://localhost:3000/test?Email='+email+'&Password='+sid}, function(error, info){
    if (error) {console.log(error);} else {console.log('Email sent: ' + info.response);}});
  res.redirect('/createSurvey/participants');
});

router.post('/addParticipant/exists', function(req, res, next) {
  var email = req.body.email;
  var sid = req.cookies.sid;
  sql.query('INSERT INTO invited (email, SID) VALUES (?,?)', [email, sid], function (error, results, fields){
    if (error) throw error;});
  transporter.sendMail({
    from: '4710team8@gmail.com',
    to: email,
    subject: 'You are Invited to take a survey with us!',
    text: 'http://localhost:3000/test?Email='+email+'&Password='+sid}, function(error, info){
    if (error) {console.log(error);} else {console.log('Email sent: ' + info.response);}});
    res.redirect('/createSurvey/participants');
});

router.get('/finish', function(req, res, next){
  res.clearCookie("sid").redirect('/home');
});

//use cookie SID to add participants to Survey
//send email

module.exports = router;
