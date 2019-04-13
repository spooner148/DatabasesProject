//Beirne

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.clearCookie('user').sendFile('createAccount.html', {root: './public/'  });
});

//get pass and email from user entry (post)
router.post('addUser', function(req, res, next) {
  var pass = req.body.pass
  var email = req.body.email

//check if email already exists
  sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ??', [email] , function (error, results, fields) {
    if (error) throw error;
    if (results[0].emailCheck != 0){
//check if email already has password
      sql.query('SELECT pass AS passCheck FROM person WHERE email = ??', [email] , function (error, results, fields) {
        if (error) throw error;
        if (results[0].passCheck == 'null')
//if it doesn't, update
          sql.query('UPDATE person SET pass = ?? WHERE email = ??', [pass, email] , function (error, results, fields) {if (error) throw error;});
//if it does, error
        else{
          res.send("ACCOUNT ALREADY EXISTS")

            //expand functionality

        }
      });
    }
//if it doesnt, insert
    sql.query('INSERT INTO person (email, pass) VALUES (??,??)', [email,pass] , function (error, results, fields) {if (error) throw error;});
  });
//then send mail for verification
  transporter.sendMail({from: '4710team8@gmail.com',
  to: email,
  subject: 'Survey Time: Please verify your accounts email adderess'',
  text: 'Please follow this link to verify your accounts email adderess: http://localhost:3000/createAccount/verify?Email='+email+'&SuperSecretWord=WOLVERINES'}, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      }
  });
});

router.get('verify', function(req,res,next){
  var email = req.query.Email;
  var ssw = req.query.SuperSecretWord;
  if (ssw == 'WOLVERINES'){
    sql.query('SELECT count(1) AS emailCheck FROM person WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0)
        sql.query('UPDATE people SET valid = 1 WHERE email = ??', [email], function (error, results, fields){if (error) throw error;});
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
