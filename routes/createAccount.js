//Beirne

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


router.get('/', function(req, res, next) {
  res.sendFile('createAccount.html', {root: './public/'  });
});

router.post('/',function(req,res,next){
  res.sendFile('createAccount.html', {root: './public/'  });
})

router.post('/addUser', function(req, res, next) {
  var pass = req.body.pass
  var email = req.body.email
  sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
         res.redirect(307, '/createAccount/addUser/passCheck');
      }
      else
        res.redirect(307, '/createAccount/addUser/insertPerson');
  });
});

router.get('/addUser/passCheck', function(req, res, next) {
  var pass = req.body.pass
  var email = req.body.email
  sql.query('SELECT pass AS passCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
    if (error) throw error;
    if (results[0].passCheck == 'null')
      res.redirect(307, '/createAccount/addUser/update');
    else{
      res.redirect(307, '/createAccount/addUser/exists');
    }
  });
});

router.post('/addUser/update', function(req, res, next) {
  var pass = req.body.pass
  var email = req.body.email
    sql.query('UPDATE person SET pass = ? WHERE email = ?', [pass, email] , function (error, results, fields) {if (error) throw error;});
    transporter.sendMail({from: '4710team8@gmail.com',
      to: email,
      subject: 'Survey Time: Please verify your accounts email adderess',
      text: 'Please follow this link to verify your accounts email adderess: http://localhost:3000/createAccount/verify?Email='+email+'&SuperSecretWord=WOLVERINES'}, function(error, info){
      if (error) {console.log(error);} else {console.log('Email sent: ' + info.response);}
    });
    res.redirect('/');
});

router.get('/addUser/Exists', function(req, res, next) {
    res.send("USER ACCOUNT EXISTS");

      //expand Functionality

});

router.post('/addUser/insertPerson', function(req, res, next) {
  var pass = req.body.pass
  var email = req.body.email
    sql.query('INSERT INTO person (email, pass) VALUES (?,?)', [email,pass] , function (error, results, fields) {if (error) throw error;});
    transporter.sendMail({
      from: '4710team8@gmail.com',
      to: email,
      subject: 'Survey Time: Please verify your accounts email adderess',
      text: 'Please follow this link to verify your accounts email adderess: http://localhost:3000/createAccount/verify?Email='+email+'&SuperSecretWord=WOLVERINES'}, function(error, info){
      if (error) {console.log(error);} else {console.log('Email sent: ' + info.response);}
    });
    res.redirect('/');
});

router.get('/verify', function(req,res,next){
  var email = req.query.Email;
  var ssw = req.query.SuperSecretWord;
  if (ssw == 'WOLVERINES'){
    sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
        sql.query('UPDATE person SET valid = 1 WHERE email = ?', [email], function (error, results, fields){if (error) throw error;});
        res.redirect('/');
      }
      else {
        res.send("Sneaky Sneaky");

          //expand functionality

      }
    });
  }
  else{
    res.send("Nice try Russia");

    //expand functionality

  }
});

module.exports = router;
