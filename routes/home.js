//Beirne
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit:8,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});


router.get('/', function(req,res,next){
  var check = req.cookies.user;////////
  if (check == null || check == "unknown")
    res.redirect('/');
  else
    res.render('home.php');
});

router.get('/email', function(req,res,next){
  sql.query('SELECT email FROM loggedIn' , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/lengths', function(req,res,next){
  var email = req.query.email
  sql.query('SELECT COUNT(*) as loopCounter FROM invited i, survey s WHERE i.email = ? AND completed = 0 AND i.sid=s.sid AND s.start <= NOW() AND s.end >= NOW() UNION SELECT COUNT(*) FROM survey WHERE creater_email = ?', [email,email] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});


router.get('/invitedInfo', function(req,res,next){
    var email = req.query.email
  sql.query('SELECT i.sid, s.title, s.start, s.end FROM invited i, survey s WHERE i.email = ? AND i.completed != 1 AND i.sid=s.sid AND s.start <= NOW() AND s.end >= NOW()', [email] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/createdInfo', function(req,res,next){
    var email = req.query.email
  sql.query('SELECT sid, title FROM survey WHERE creater_email = ?', [email] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});





//just needs that display list stuff

module.exports = router;
