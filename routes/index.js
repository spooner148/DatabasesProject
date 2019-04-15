//Beirne
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit:3,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mydb"
});

router.get('/', function(req, res, next) {
    sql.query('UPDATE loggedIn SET email = null', function (error, results, fields) {
    if (error) throw error;});
    res.cookie('user', 'unknown').sendFile('Login.html', {root: './public/'  }); //Sets name = express
});

router.post('/', function(req, res, next) {
    var email = req.body.Email;
    var pass = req.body.Password;
    sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
        sql.query('SELECT pass FROM person WHERE email = ?', [email] , function (error, results, fields) {
          if (error) throw error;
          if(results[0].pass != "null"){
            if(results[0].pass == pass){
              sql.query('SELECT valid FROM person WHERE email = ?', [email], function(error, results, fields){
                if (error) throw error;
                if(results[0].valid == 1){
                  res.redirect(307, '/loginUpdate');
                }
                else
                  res.send("USER NOT VALIDATED");

                   ///expand functionality

              });
            }
            else {
              res.send("Invalid password, please try again");

              //expand functionality

            }
          }
          else{
            res.send("This account does not exist, plase create an account!");

            //expand functionality

          }
        });
    }
      else{
        res.send("This account does not exist, please create an account!");

        //expand functionalty

      }
    });
});

router.post('/loginUpdate', function(req,res,next){
    var email = req.body.Email;
    sql.query('UPDATE loggedIn SET email = ?',[email], function (error, results, fields) {
      if (error) throw error;});
    res.cookie('user', email).redirect('/home');
});


router.get('/logout', function(req,res,next){
    sql.query('UPDATE loggedIn SET email = null', function (error, results, fields) {
      if (error) throw error;});
    res.clearCookie('user').redirect('/');
});

router.get('/ooterror', function(req,res,next){
    res.send("Survey cannot be found, it may not have started yet or may have expired")
});

module.exports = router;
