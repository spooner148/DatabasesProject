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
                    <form name="1" action="http://127.0.0.1:3000/answerSurvey/submitAnswerType1" method="post">
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