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
    res.sendFile('home.html', {root: './public/'});
});

router.post('/', function(req, res, next) {
  res.sendFile('home.html', {root: './public/'  })
});

router.get('/email', function(req,res,next){
  sql.query('SELECT email FROM loggedIn' , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/lengths', function(req,res,next){
  var email = req.query.email
  sql.query('SELECT COUNT(*) as loopCounter FROM invited WHERE email = ? UNION SELECT COUNT(*) FROM survey WHERE creater_email = ?', [email,email] , function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});


router.get('/invitedInfo', function(req,res,next){
    var email = req.query.email
  sql.query('SELECT i.sid, s.title FROM invited i, survey s WHERE i.email = ? AND i.completed != 1 AND i.sid=s.sid', [email] , function (error, results, fields) {
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
