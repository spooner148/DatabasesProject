var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('Login.html', {root: './public/'  });

  var numQuestions
  //count number of questions in survey using survey id from cookie
  var i;
  for(i=0; i<numQuestions; i++){

    //query input: survey id, question id i. output: question type, question description

    //write all the questions on the page
    res.send("Question " + i + ":\n" + questionDesc + "\n");
  }

});



router.post('submitSurvey', function(req, res, next) {

  var numQuestions
  //count number of questions in survey using survey id from cookie
  var i;
  var questions = [q1, q2, q3];
  for(i=0; i<numQuestions; i++)
{

  }

});


module.exports = router;
