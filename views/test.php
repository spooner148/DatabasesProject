<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body class="page_bg">
      <?php
      $url = 'http://127.0.0.1:3000/home/email';
      $email = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/home/lengths?email=' . $email[0]["email"];
      $loops = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/home/invitedInfo?email=christopherbeirne@yahoo.com';
      $invites = json_decode(file_get_contents($url), true);
      $url = 'http://127.0.0.1:3000/home/createdInfo?email=' .  $email[0]["email"];
      $created = json_decode(file_get_contents($url), true);

      echo "LIST OF SURVEYS YOU CAN TAKE:<br>";
      for ($i = 0; $i<$loops[0]["loopCounter"];$i++){
        echo "<a href=http://127.0.0.1:3000/answerSurvey?email=".$email[0]["email"]."&sid=".$invites[$i]["sid"].">".$invites[$i]["title"]."</a><br>";
      }
      echo "LIST OF SURVEYS YOU HAVE MADE:<br>";
      for ($i = 0; $i<$loops[1]["loopCounter"];$i++){
        echo "<a href=http://127.0.0.1:3000/viewSurvey?email=".$email[0]["email"]."&sid=".$created[$i]["sid"].">".$created[$i]["title"]."</a><br>";
      }
      ?>.
  </body>
</html>
