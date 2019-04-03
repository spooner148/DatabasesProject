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

function searchContacts() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("Userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./SearchContacts.php",false);
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
                        var table = document.getElementById("contactList");
                        table.deleteTHead();
                        if(str.includes("No Records Found"))
                        {
                            //alert("Error: no matching contacts found");
                            var newContact = table.createTHead();
                            var newContactinfo = newContact.insertRow(0);
                            newContactinfo.scope = "row";
                            newContactinfo.insertCell(0).outerHTML = '<th scope="col">No matching contacts found</th>';
                        }
                            for (var i = 0; i < jsonObject.results.length; i++)
                            {
                                //var opt = document.createElement("option");
                                var jsonObjectTwo = jsonObject.results[i];
                                var error = jsonObjectTwo.error;
                                if (error == "")
                                {
                                    var ContactName = jsonObjectTwo.ContactFirstName +" "+ jsonObjectTwo.ContactLastName;
                                    var newContact = table.createTHead(jsonObjectTwo.Userid);
                                    var newContactinfo = newContact.insertRow(0);
                                    newContactinfo.scope = "row";
                                    newContactinfo.value = "1";
                                    newContactinfo.insertCell(0).outerHTML = '<th scope="col">'+(jsonObject.results.length - i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newContactinfo.insertCell(1).outerHTML = '<th scope="col">'+jsonObjectTwo.ContactFirstName+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newContactinfo.insertCell(2).outerHTML = '<th scope="col">'+jsonObjectTwo.ContactLastName+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newContactinfo.insertCell(3).outerHTML = '<th scope="col">'+jsonObjectTwo.ContactNumber+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                                    newContactinfo.insertCell(4).outerHTML = '<th scope="col">'+jsonObjectTwo.Address+"</th>";
                                    var Contactid = jsonObjectTwo.Contactid;
                                    newContactinfo.insertCell(5).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Contactid+'" onclick="setUpdateId(this.value)" class="btn btn-primary btn" data-toggle="modal" data-target="#EditContactModal">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                                    newContactinfo.insertCell(6).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.Contactid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Delete</button></th>';
                                    //var newRow = table.rows[0];
                                    //table.parent.insertBefore(newRow, table.rows[1]);
                                    //alert(ContactName);
                                    //opt.text = ContactName;
                                    //opt.value = "";
                                    //contactList.options.add(opt);
                                }
                            }
                    //}
                    
                    
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("contactSearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("index.html");
    }
}

function doLogout()
{
    window.location.assign("index.html");
    localStorage.removeItem("Userid");
}

function doLogin(x)
{
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    var jsonPayload = '{"Username" : "' + login + '", "Password" : "' + password + '"}';

    //(0) means signing into account
    if(x == 0)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./Login.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        //should access Login.php and post values to them. May need to use: $name = $_Post['Username']; to get value
//         $.post('Login.php', {Username: login, Password: password},
//         function(data)
//         {
//             //if .php states: echo "0"; all is good
//             if(data == "0")
//             {
//                 window.location.assign(window.location.hostname + "/contacts.html");
//             }
//             //Wrong password
//             else if(data == "1")
//             {
//                 document.getElementById("LogError").innerHTML = "Password was incorrect";
//             }
//             //Account doesn't exist
//             else
//             {
//                 document.getElementById("LogError").innerHTML = "This account does not exist";
//             }
//         });
        
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
            window.location.assign("contacts.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
        
        //xhr.open("GET", "Login.php", true);
        //xhr.send();
    }
    //(1) means creating an account
    else if(x == 1)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./CreateAccount.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        //should access CreateAccount.php and post values to them. May need to use: $name = $_Post['Username']; to get value
//         $.post('CreateAccount.php', {Username: login, Password: password},
//         function(data)
//         {
//             //if .php states: echo "0"; all is good
//             if(data == "0")
//             {
//                 window.location.href = "contacts.html"
//             }
//             //Username is already being used
//             else
//             {
//                 document.getElementById("LogError").innerHTML = "Sorry, but this Username has been taken";
//             }
//         });
        
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
            window.location.assign("contacts.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
        
    }
    
    //are these .php files referring to, what? shouldn't doLogin refer to
    //Login.php or CreateAccount.php? Why is it referring instead to these?
    
}

// function getAccountDate()
// {
//     var d = new Date();
//     var m = d.getMonth();
//     var t = d.getDay();
//     var y = d.getFullYear();
//     //alert(m + " " + t + ", " + y);
//     return(m + " " + t + ", " + y);
// }
