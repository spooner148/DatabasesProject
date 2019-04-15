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
      $url = 'http://127.0.0.1:3000/viewSurvey/accessCache';
      $qCount = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/viewSurvey/questions?sid=' . $qCount[0]["sid"];
      $questions = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/viewSurvey/answers?sid=' . $qCount[0]["sid"];
      $answers = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/answerSurvey/survey?sid=' . $qCount[0]["sid"];
      $surveyInfo = json_decode(file_get_contents($url), true);
      $email = $qCount[0]['email'];
      $sid = $qCount[0]['sid'];
      
      echo "<h1>".$surveyInfo[0]['title']."</h1><br>";
      echo $surveyInfo[0]['description']."<br><br>";
      echo "Your Survey Results:<br>";
      $j=0;
      $k=0;
      for ($i = 0; $i<($qCount[0]["qidcount"]);$i++){
        echo $questions[$i]['question']."<br>";
        if($questions[$i]['type']==0){
          echo round($answers[$j]['avg'], 2)."<br>";
          $j++;
        }
        else{
          $j=$i;
          $k=1;
          while($answers[$j]['qid'] == ($i+$qCount[0]['startqid'])){
            echo $k.")<br>";
            echo $answers[$j]['avg']."<br>";
            $j++;
            $k++;
          }
        }
        echo "<br>";
      };
      ?>
      <div>
        <br>
        <br>
        <br>
      </form>
      <div> <button type="button" onclick="returnToHome()">Return to Home</button></div>
  </body>
</html>
