//Beirne, Spooner

var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit:2,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});

//CATCH TO MAKE SURE USER IS LOGGED IN
router.get('/', function(req,res){
  var check = cookieParser();////////
  if (check == null || check== unknown)
    res.sendFile('createSurveyStart.html', {root: './public/'});
  else
    res.redirect('/home');
});

router.post('/', function(req, res, next) {
  res.sendFile('createSurveyStart.html', {root: './public/'});
});

router.post('addSurvey', function(req,res,next){
  var email = req.cookieParser();//////////////////////////////////////////////////
  var title = req.body.title
  var desc = req.body.description
  var start = req.body.start
  var end = req.body.end
  sql.query('INSERT INTO survey (Title, Description, Start, End, Creater_Email) VALUES (??,??,?,?,??)', [title, descr, start, end, email] , function (error, results, fields) {
    if (error) throw error;
    res.cookie('sid', result.insertId);
  });
});

router.post('questions', function(req, res, next){
  res.sendFile('createSurveyQuestions.html', {root: './public/'});
});

router.post('addQuestion', function(req, res, next) {
  var questionType = req.body.type
  var questionDesc = req.body.desc
  var sid = req.cookieParser();/////////////////////////////////////
  //send question type and desc to database, along with surveyId from cookie
  sql.query('INSERT INTO question (SID, question, type) VALUES (??,??,??)', [sid, questionDesc, questionType], function (error, results, fields){
    if (error) throw error;
  });
});
//use cookie SID to query database with question and type

router.post('participants', function(req, res, next){
  res.sendFile('createSurveyParticipants.html', {root: './public/'});
})

router.post('addParticipant', function(req, res, next) {
  //res.sendFile('Login.html', {root: './public/'  });
  var email = req.body.email
  var sid = req.cookieParser()////////////////////////
  sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
    if (error) throw error;
    if (results[0].emailCheck == 0)
      sql.query('INSERT INTO person (email) VALUES (??); INSERT INTO invited (email, SID) VALUES (??,??)', [email, email, sid], function (error, results, fields){
        if (error) throw error;});
    else
      sql.query('INSERT INTO invited (email, SID) VALUES (??,??)', [email, sid], function (error, results, fields){
        if (error) throw error;});
  });
  sql.query('INSERT INTO question VALUES (??,??,??)', [sid, questionType, questionDesc], function (error, results, fields){
    if (error) throw error;});
  transporter.sendMail({from: '4710team8@gmail.com',
  to: email,
  subject: 'You are Invited to take a survey with us!',
  text: 'http://localhost:3000/test?Email='+email+'&Password='+sid}, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      }
  });
})

router.post('finish', function(req, res, next){
  res.clearCookie('sid').redirect('/home');
});

//use cookie SID to add participants to Survey
//send email

module.exports = router;
