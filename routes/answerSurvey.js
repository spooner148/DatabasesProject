var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit:2,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile('Login.html', {root: './public/'  });
//
//   var numQuestions
//   //count number of questions in survey using survey id from cookie
//   var i;
//   for(i=0; i<numQuestions; i++){
//
//     //query input: survey id, question id i. output: question type, question description
//
//     //write all the questions on the page
//     res.send("Question " + i + ":\n" + questionDesc + "\n");
//   }
//
// });
//
//
//
// router.post('submitSurvey', function(req, res, next) {
//
//   var numQuestions
//   //count number of questions in survey using survey id from cookie
//   var i;
//   var questions = [q1, q2, q3];
//   for(i=0; i<numQuestions; i++)
// {
//
//   }
//
// });

router.get('/', function(req,res,next){
  var sid = req.query.sid;
  var email = req.cookies.user;
  sql.query('SELECT qid FROM question WHERE sid = ?',[sid], function (error, results, fields) {
    if (error) throw error;});
  res.cookie('user', email).redirect('-------------------------------')
});

router.get('/continue', function(req,res,next){
  var sid = req.query.sid;
  var email = req.cookies.user;
  sql.query('',[], function (error, results, fields) {
    if (error) throw error;});
});

router.post('/answerQuestionType1', function(req,res,next){
  res.render('answerSurveyT1.php', {root: './public/'  });
});

router.post('/answerQuestionType2', function(req,res,next){
  res.render('answerSurveyt2.php', {root: './public/'  });
});

router.post('/question', function(req,res,next){
  var qid = req.query.qid;
  sql.query('SELECT question FROM questions WHERE qid = ?', [qid] , function (error, results, fields) {
    if (error) throw error;
    res.sendFile(results);
  });
});

router.post('/submitAnswerType1', function(req,res,next){
  var email = req.cookies.user;
  var answer = req.body.answer;
  var qid = req.body.qid;
  sql.query('INSERT INTO person_answers_question (email, qid, answered) VALUES (?,?,1); INSERT INTO type1 (email, qid, answer) VALUES (?,?,?)', [email,qid,email,qid,answer] , function (error, results, fields) {
    if (error) throw error;});
  res.redirect('/answerSurvey/continue');
});

router.post('/submitAnswerType2', function(req,res,next){
  var email = req.cookies.user;
  var answer = req.body.answer;
  var qid = req.body.qid;
  sql.query('INSERT INTO person_answers_question (email, qid, answered) VALUES (?,?,1); INSERT INTO type2 (email, qid, answer) VALUES (?,?,?)', [email,qid,email,qid,answer] , function (error, results, fields) {
    if (error) throw error;});
  res.redirect('/answerSurvey/continue');
})
module.exports = router;

person_answers_question: email, qid, answered
type x: email, quid, answer
