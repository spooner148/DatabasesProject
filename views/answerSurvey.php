<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script language="javascript">
      function submitSurvey() {
        location.assign("http://127.0.0.1:3000/answerSurvey/submitFinal");
      }
      function returnToHome(){
        location.assign("http://127.0.0.1:3000/home");
      }
      function checkFilled(theForm) {
        if (theForm.answer.value == ''){
          alert('Please Enter an Answer');
          return false;
        }
        else {
          return true;
        }
      }
    </script>
  </head>
  <body class="page_bg">
    <iframe style="display:none" name="submitter"></iframe>
      <?php
      $url = 'http://127.0.0.1:3000/answerSurvey/accessCache';
      $qCount = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/answerSurvey/questions?sid=' . $qCount[0]["sid"];
      $questions = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/answerSurvey/survey?sid=' . $qCount[0]["sid"];
      $surveyInfo = json_decode(file_get_contents($url), true);
      $email = $qCount[0]['email'];
      $sid = $qCount[0]['sid'];

      echo "<h1>".$surveyInfo[0]['title']."</h1><br>";
      echo $surveyInfo[0]['description']."<br><br>";
      echo "Please, Enjoy this Survey:<br>";
      for ($i = 0; $i<($qCount[0]["qidcount"]);$i++){
        $qid=$qCount[0]["startqid"]+$i;
        echo "<br>".$questions[$i]['question']."<br>";
        if($questions[$i]['type']==0){
                    echo <<<FORM
          <form name="form$i" action="http://127.0.0.1:3000/answerSurvey/submitAnswerType1" target="submitter" method="post">
          <input type="hidden" name="email" value="$email">
          <input type="hidden" name="qid" value="$qid">
            <div>
              <label for="Type 1">Worst</label>
              <input type="radio" id="Type 1" name="answer" value=1>
              <input type="radio" id="Type 2" name="answer" value=2>
              <input type="radio" id="Type 3" name="answer" value=3 checked>
              <input type="radio" id="Type 4" name="answer" value=4>
              <input type="radio" id="Type 5" name="answer" value=5>
              <label for="Type 5">Best</label>
            </div>
            <div>
              <button>Submit</button>
            </form>
FORM;
        }
        else{
          echo <<<OTHERFORM
          <form name="form$i" action="http://127.0.0.1:3000/answerSurvey/submitAnswerType2" target="submitter" onsubmit="return checkFilled(this)" method="post">
          <input type="hidden" name="email" value="$email">
          <input type="hidden" name="qid" value="$qid">
            <div>
              <textarea name="answer" id="answer"></textarea>
            </div>
            <div>
              <button>Submit</button>
          </form>
OTHERFORM;
        }
      };
      ?>
      <div>
        <br>
        <br>
        <br>
        <form name="finalSubmit" action="http://127.0.0.1:3000/answerSurvey/submitFinal" method="post">
        <input type="hidden" name="email" value="<?php echo $email ?>">
        <input type="hidden" name="sid" value="<?php echo $sid ?>">
        <button>Submit Survey</button>
      </form>
      <div> <button type="button" onclick="returnToHome()">Save and Return to Home</button></div>
  </body>
</html>
