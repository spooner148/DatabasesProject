var http=require('http');
var url=require('url');
var fs=require('fs');
const nodemailer = require('nodemailer');

var server=http.createServer(function(request,response){
var path = url.parse(request.url).pathname;


	switch(path){
		case '/':
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write("This is Test Message.");
			response.end();
			break;

		case '/HtmlPage1.html':
			fs.readFile(__dirname + path,function(error,data){
				if(error)
                {
                   response.writeHead(404);
                   response.write(error);
                   response.end();
                } else {
					response.writeHead(200,{'Content-Type':'text/html'});
					response.write(data);
					response.end();
			    }
			});
			break;

		case '/HtmlPage2.html':

			fs.readFile(__dirname + path,function(error,data){
				if(error)
                {
                   response.writeHead(404);
                   response.write(error);
                   response.end();
                } else {
					response.writeHead(200,{'Content-Type':'text/html'});
					response.write(data);
					response.end();
			    }
			});
			break;

			case '/Send':

			{var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: '4710team8@gmail.com',
			    pass: 'superadmin'
			  }
			});

			var mailOptions = {
			  from: '4710team8@gmail.com',
			  to: 'christopherbeirne@yahoo.com',
			  subject: 'You are Invited to take a survey with us!',
			  text: ''
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
			  }
			});}
			break;

		default :
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
	}
});

server.listen(8082);
