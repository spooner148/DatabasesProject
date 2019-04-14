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
router.get('/', function(req, res, next) {
  res.render('viewSurvey.php', {root: './public/'  });
});


router.get('/questions', function(req,res,next){
  var email = req.query.email
  sql.query('SELECT qid, question FROM question WHERE sid = ?', [sid] , function (error, results, fields) {
    if (error) throw error
    res.json(results);
  });
});

router.get('/type1Answers', function(req,res,next){
    var sid = req.query.sid
  sql.query('SELECT qid, AVG(answer) as avg FROM type1 t, question q WHERE q.sid = ? AND t.qid = q.qid GROUP BY qid', [sid] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/type2Answers', function(req,res,next){
    var sid = req.query.sid
  sql.query('SELECT qid, answer FROM type2 t, question q WHERE q.sid = ? AND t.qid = q.qid', [sid] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/answersCombined', function(req,res,next){
    var sid = req.query.sid
  sql.query('SELECT qid, AVG(answer) as avg FROM type1 t, question q WHERE q.sid = ? AND t.qid = q.qid GROUP BY qid UNION SELECT qid, answer FROM type2 t, question q WHERE q.sid = ? AND t.qid = q.qid', [sid] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});


module.exports = router;
