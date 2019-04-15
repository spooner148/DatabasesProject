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

function initialize(sid) {
    return new Promise(function(resolve, reject) {
      sql.query('SELECT sid, qid, COUNT(qid) as count FROM question WHERE sid = ?',[sid], function (error, results, fields){
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};


router.get('/', function(req, res, next) {
  var sid = req.query.sid;
  var initializePromise = initialize(sid);
  initializePromise.then(
    function(resolved) {
      var sid = resolved[0]['sid'];
      var qid = resolved[0]['qid'];
      var count = resolved[0]['count'];
      sql.query('UPDATE answering SET sid = ?, startqid = ?, qidcount = ? WHERE a = 1',[sid,qid,count], function (error, results, fields) {
        if (error) throw error;
      });
      res.render('viewSurvey.php')
    },
    function(rejected) {
      throw rejected;
  });
});

router.get('/accessCache', function(req,res,next){
  sql.query('SELECT startqid, qidcount, sid FROM answering WHERE a = 1', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

// router.get('/', function(req, res, next) {
//   res.render('viewSurvey.php', {root: './public/'  });
// });


router.get('/questions', function(req,res,next){
  var sid = req.query.sid
  sql.query('SELECT qid, question, type FROM question WHERE sid = ?', [sid] , function (error, results, fields) {
    if (error) throw error
    res.json(results);
  });
});

// router.get('/type1Answers', function(req,res,next){
//     var sid = req.query.sid
//   sql.query('SELECT qid, AVG(answer) as avg FROM type1 t, question q WHERE q.sid = ? AND t.qid = q.qid GROUP BY qid', [sid] , function (error, results, fields) {
//     if (error) throw error;
//     res.json(results);
//   });
// });
//
// router.get('/type2Answers', function(req,res,next){
//     var sid = req.query.sid
//   sql.query('SELECT qid, answer FROM type2 t, question q WHERE q.sid = ? AND t.qid = q.qid', [sid] , function (error, results, fields) {
//     if (error) throw error;
//     res.json(results);
//   });
// });

router.get('/answers', function(req,res,next){
    var sid = req.query.sid
  sql.query('SELECT q.qid, AVG(answer) as avg FROM type1 t, question q WHERE q.sid = ? AND t.qid = q.qid GROUP BY qid UNION SELECT q.qid, answer FROM type2 t, question q WHERE q.sid = ? AND t.qid = q.qid ORDER BY qid ASC;', [sid,sid] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});






module.exports = router;
