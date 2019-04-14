//Beirne
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

router.get('/', function(req,res,next){
    res.render('viewSurvey.php', {root: './public/', $email: req.cookies.user});
});
router.post('/', function(req,res,next){
    res.render('test.php', {root: './public/'});
});
module.exports = router;
