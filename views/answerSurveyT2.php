<!--spooner, Beirne-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <title>Group Project Login Page</title>
    <link href="splash.css" rel="stylesheet" type="text/css" />
    <script language="javascript">
      function () {
        location.assign("http://127.0.0.1:3000/");
      }
      function () {
        location.assign("http://127.0.0.1:3000/");
      }
    </script>
  </head>
  <body>
    <h1 id="Pname" >Question</h1>
    <div id="LogBox1">
        <div id="DiscriptBox">
            <div id="LogBox2">
                <div id="LogOption1">
                    <br><h1>Question</h1>
                    <br>
                    <form name="1" action="http://127.0.0.1:3000/answerSurvey/submitAnswerType2" method="post">
                      <div>
                        <label for="answer">Question</label>
                        <br>
                        <textarea name="answer" id="answer"></textarea>
                      </div>
                      <div>
                        <button onclick="--------------------------">Login</button>
                      </form>
                    <br>
                    <div id="LogBox3">
                    </div>
                </div>
                <p id="LogError"></p>
            </div>
        </div>
    </div>
  </body>
</html>