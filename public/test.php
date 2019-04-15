<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body class="page_bg">
      <?php
      $email = $_COOKIE['user'];
      echo "user cookie is: ".$_COOKIE['user'];
      echo "<br>";
      echo $_COOKIE['user'];
      $url = 'http://127.0.0.1:3000/home/lengths';
      $obj = json_decode(file_get_contents($url), true);


      for ($i = 0; $i<$obj[1]["loopCounter"];$i++){
        echo "YOYOYO <br>";
      }
      for ($i = 0; $i<$obj[1]["loopCounter"];$i++){
        echo "YAYAYA <br>";
      }
      ?>.
  </body>
</html>
