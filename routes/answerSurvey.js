var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = mysql.createPool({
  multipleStatements: true,
  connectionLimit:2,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});


function initialize(sid,email) {
    return new Promise(function(resolve, reject) {
      sql.query('SELECT sid, qid, COUNT(qid) as count,  ?  as email FROM question WHERE sid = ?',[email, sid], function (error, results, fields){
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

router.get('/', function(req,res,next){
var sid = req.query.sid;
var email = req.query.email;
sql.query('SELECT COUNT(1) as test, ? as sid, ? as email FROM survey WHERE sid = ? AND start <= NOW() AND end >= NOW()',[sid, email, sid], function (error, results, fields) {
  if (error) throw error;
  if (results[0]['test']==0)
    res.redirect('/ooterror');
  else {
    res.redirect("/answerSurvey/startSurvey?email=" + results[0]['email'] +"&sid="+ results[0]['sid'])
  }
});
});;

router.get('/startSurvey', function(req,res,next){
  var sid = req.query.sid;
  var email = req.query.email;
  var initializePromise = initialize(sid,email);
  initializePromise.then(
    function(resolved) {
      var sid = resolved[0]['sid'];
      var qid = resolved[0]['qid'];
      var count = resolved[0]['count'];
      var email = resolved[0]['email'];
      sql.query('UPDATE answering SET sid = ?, startqid = ?, qidcount = ?, email = ? WHERE a = 1',[sid,qid,count,email], function (error, results, fields) {
        if (error) throw error;
      });
      res.render('answerSurvey.php')
    },
    function(rejected) {
      throw rejected;
  });
});

router.get('/accessCache', function(req,res,next){
  sql.query('SELECT startqid, qidcount, sid, email FROM answering WHERE a = 1', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/questions', function(req,res,next){
  var sid = req.query.sid;
  sql.query('SELECT qid, question, type FROM question WHERE sid = ?', [sid] , function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/survey', function(req,res,next){
  var sid = req.query.sid;
  sql.query('SELECT title, description FROM survey WHERE sid = ?', [sid] , function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send(results);
  });
});

router.post('/submitAnswerType1', function(req,res,next){
  var email = req.body.email;
  var answer = req.body.answer;
  var qid = req.body.qid;
  sql.query('INSERT INTO person_answers_question (email, qid, answered) VALUES (?,?,1) ON DUPLICATE KEY UPDATE answered = 1; INSERT INTO type1 (email, qid, answer) VALUES (?,?,?) ON DUPLICATE KEY UPDATE answer = ?', [email,qid,email,qid,answer,answer] , function (error, results, fields) {
    if (error) throw error;});
});

router.post('/submitAnswerType2', function(req,res,next){
  var email = req.body.email;
  var answer = req.body.answer;
  var qid = req.body.qid;
  sql.query('INSERT INTO person_answers_question (email, qid, answered) VALUES (?,?,1) ON DUPLICATE KEY UPDATE answered = 1; INSERT INTO type2 (email, qid, answer) VALUES (?,?,?) ON DUPLICATE KEY UPDATE answer = ?', [email,qid,email,qid,answer,answer] , function (error, results, fields) {
    if (error) throw error;});
})

router.post('/submitFinal', function(req,res,next){
  var email = req.body.email;
  var sid = req.body.sid;
  sql.query('UPDATE invited SET completed = 1 WHERE email = ? AND sid = ?', [email,sid] , function (error, results, fields) {
    if (error) throw error;});
  sql.query('UPDATE answering SET startqid = NULL, qidcount = NULL, SID = NULL, email = NULL', function(error,results,fields){
    if(error) throw error;});
  res.redirect('/home');
})

module.exports = router;
