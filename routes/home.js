//Beirne
var express = require('express');
var router = express.Router();



/////////////////////////////////////////////
TO DO      TO DO      TO DO      TO DO
////////////////////////////////////////////


router.post('/', function(req, res, next) {
  res.sendFile('createSurveyStart.html', {root: './public/'  })
});
//just needs that display list stuff

module.exports = router;
