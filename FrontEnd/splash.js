//Index Functions
function toggleEnter(x)
{
    //alert(window.location.pathname);
    switch(x)
    {
        case 0:
            document.getElementById("LogBox3").style.display = "none";
            document.getElementById("LogBox4").style.display = "block";
            break;

        case 1:
            document.getElementById("LogBox4").style.display = "none";
            document.getElementById("LogBox3").style.display = "block";
            break;
    }
}

function passVisiblity()
{
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//Switch to additional info if necessary to create account
function logOption(x)
{
    switch(x)
    {
        case 0:
            //check that username and password are new
            document.getElementById("LogOption1").style.display = "none";
            document.getElementById("LogOption2").style.display = "block";
            break;

        case 1:
            //check that username and password are new
            document.getElementById("LogOption2").style.display = "none";
            document.getElementById("LogOption1").style.display = "block";
            break;
    }
}
