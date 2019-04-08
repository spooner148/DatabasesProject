//API Interaction
var APIRoot = "./";
var fileExtension = ".php";
var userId = 0;

function hideOrShow (elementId, showState)
{
    var vis = "visible";
    var dis = "block";
    if ( !showState)
    {
        vis = "hidden";
        dis = "none";
    }
    document.getElementById(elementId).style.visibility=vis;
    document.getElementById(elementId).style.display=dis;
}

function setUpdateId(val)
{
    localStorage.setItem("Updateid",val);
}

function searchTakeSurveys() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("Userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./SearchSurveys.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        var Userid = localStorage.getItem("Userid");
        
        var jsonPayload = '{"Search" : "' + search + '", "Userid" : "' + Userid + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "contactList", true );
                    var str = xhr.responseText;
                    
                   // else
                   // {
                        var jsonObject = JSON.parse( xhr.responseText );
                        var table = document.getElementById("TakeList");
                        table.deleteTHead();
                        if(str.includes("No Records Found"))
                        {
                            
                            var newSurvey = table.createTHead();
                            var newSurveyinfo = newSurvey.insertRow(0);
                            newSurveyinfo.scope = "row";
                            newSurveyinfo.insertCell(0).outerHTML = '<th scope="col">No matching Surveys found</th>';
                        }
                            for (var i = 0; i < jsonObject.results.length; i++)
                            {
                                //var opt = document.createElement("option");
                                var jsonObjectTwo = jsonObject.results[i];
                                var error = jsonObjectTwo.error;
                                if (error == "")
                                {
                                    var SurveyName = jsonObjectTwo.SurveyText +" "+ jsonObjectTwo.SurveyLastName;
                                    var newSurvey = table.createTHead(jsonObjectTwo.Userid);
                                    var newSurveyinfo = newSurvey.insertRow(0);
                                    newSurveyinfo.scope = "row";
                                    newSurveyinfo.value = "1";
                                    newSurveyinfo.insertCell(0).outerHTML = '<th scope="col">'+(jsonObject.results.length - i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newSurveyinfo.insertCell(1).outerHTML = '<th scope="col">'+jsonObjectTwo.SurveyText+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newSurveyinfo.insertCell(2).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Surveyid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Dismiss</button></th>';
                                    
                                }
                            }
                    //}
                    
                    
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("SurveySearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("splash.html");
    }
}

function searchViewSurveys() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("Userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./SearchSurveys.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        var Userid = localStorage.getItem("Userid");
        
        var jsonPayload = '{"Search" : "' + search + '", "Userid" : "' + Userid + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "contactList", true );
                    var str = xhr.responseText;
                    
                   // else
                   // {
                        var jsonObject = JSON.parse( xhr.responseText );
                        var table = document.getElementById("ViewList");
                        table.deleteTHead();
                        if(str.includes("No Records Found"))
                        {
                            
                            var newSurvey = table.createTHead();
                            var newSurveyinfo = newSurvey.insertRow(0);
                            newSurveyinfo.scope = "row";
                            newSurveyinfo.insertCell(0).outerHTML = '<th scope="col">No matching Surveys found</th>';
                        }
                            for (var i = 0; i < jsonObject.results.length; i++)
                            {
                                //var opt = document.createElement("option");
                                var jsonObjectTwo = jsonObject.results[i];
                                var error = jsonObjectTwo.error;
                                if (error == "")
                                {
                                    var SurveyName = jsonObjectTwo.SurveyText +" "+ jsonObjectTwo.SurveyLastName;
                                    var newSurvey = table.createTHead(jsonObjectTwo.Userid);
                                    var newSurveyinfo = newSurvey.insertRow(0);
                                    newSurveyinfo.scope = "row";
                                    newSurveyinfo.value = "1";
                                    newSurveyinfo.insertCell(0).outerHTML = '<th scope="col">'+(jsonObject.results.length - i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newSurveyinfo.insertCell(1).outerHTML = '<th scope="col">'+jsonObjectTwo.SurveyText+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newSurveyinfo.insertCell(2).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Surveyid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Dismiss</button></th>';
                                    
                                }
                            }
                    //}
                    
                    
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("SurveySearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("splash.html");
    }
}

function searchQuestions() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("Userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./SearchQuestions.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        var Userid = localStorage.getItem("Userid");
        
        var jsonPayload = '{"Search" : "' + search + '", "Userid" : "' + Userid + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "contactList", true );
                    var str = xhr.responseText;
                    
                   // else
                   // {
                        var jsonObject = JSON.parse( xhr.responseText );
                        var table = document.getElementById("QuestionList");
                        table.deleteTHead();
                        if(str.includes("No Records Found"))
                        {
                            
                            var newQuestion = table.createTHead();
                            var newQuestioninfo = newQuestion.insertRow(0);
                            newQuestioninfo.scope = "row";
                            newQuestioninfo.insertCell(0).outerHTML = '<th scope="col">No matching questions found</th>';
                        }
                            for (var i = 0; i < jsonObject.results.length; i++)
                            {
                                //var opt = document.createElement("option");
                                var jsonObjectTwo = jsonObject.results[i];
                                var error = jsonObjectTwo.error;
                                if (error == "")
                                {
                                    var QuestionName = jsonObjectTwo.QuestionText +" "+ jsonObjectTwo.QuestionLastName;
                                    var newQuestion = table.createTHead(jsonObjectTwo.Userid);
                                    var newQuestioninfo = newQuestion.insertRow(0);
                                    newQuestioninfo.scope = "row";
                                    newQuestioninfo.value = "1";
                                    newQuestioninfo.insertCell(0).outerHTML = '<th scope="col">'+(jsonObject.results.length - i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newQuestioninfo.insertCell(1).outerHTML = '<th scope="col">'+jsonObjectTwo.QuestionText+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newQuestioninfo.insertCell(2).outerHTML = '<th scope="col">'+jsonObjectTwo.QuestionNumber+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    var Questionid = jsonObjectTwo.Questionid;
                                    newQuestioninfo.insertCell(3).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Questionid+'" onclick="setUpdateId(this.value)" class="btn btn-primary btn" data-toggle="modal" data-target="#EditQuestionModal">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                                    newQuestioninfo.insertCell(4).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Questionid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Delete</button></th>';
                                    
                                }
                            }
                    //}
                    
                    
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("questionSearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("splash.html");
    }
}

function doLogout()
{
    window.location.assign("index.html");
    localStorage.removeItem("Userid");
}

function doLogin(x)
{
    var login = document.getElementById("Email").value;
    var password = document.getElementById("pass").value;

    var jsonPayload = '{"Email" : "' + login + '", "Password" : "' + password + '"}';

    //(0) means signing into account
    if(x == 0)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./Login.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        

        
        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            Userid = jsonObject.Userid;
            LastLogin = jsonObject.LastLogin;
            DateCreated = jsonObject.DateCreated;
            if (Userid < 1)
            {
                Error = jsonObject.error;
                document.getElementById("LogError").innerHTML = Error;
                return;
            }
            Username = jsonObject.Username;
            //goes to home page
            window.location.assign("home.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
        
        
    }
    //(1) means creating an account
    else if(x == 1)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./CreateAccount.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        
        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            Userid = jsonObject.Userid;
            if (Userid < 1)
            {
                Error = jsonObject.error;
                document.getElementById("LogError").innerHTML = Error;
                return;
            }
            Username = jsonObject.Username;
            window.location.assign("home.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
        
    }
    

    
}


