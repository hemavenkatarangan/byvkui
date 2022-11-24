const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
		
		
module.exports = {

    mailService: async (req, res) => {
	console.log(req.body)
	var toAddress = req.body.to_address;
	var emailBody = req.body.email_body;
	var subject = req.body.subject;
	var name = req.body.name;
	var course = req.body.course;
    	
	/*	var smtpTransport = nodemailer.createTransport(mandrillTransport({
		    auth: {
		      apiKey : 'WfHaBeLBBL0LO9POyRHmSg'
		    }
		}));*/
		
		const mailTransport = nodemailer.createTransport({    
    host: "smtpout.secureserver.net",  
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
        user: "admin@bharatyogavidyakendra.in",
        pass: "Bharat#1974" 
    }
});

mailTransport.use('compile', hbs(handlebarOptions))
		
		
		let mailData={
		   from : 'admin@bharatyogavidyakendra.in',
		   to : toAddress,
		   subject : subject,
		   template : 'email',
		    context:{
        name: name, 
        course: course 
    }
		};
		console.log(mailData);
		
		mailTransport.sendMail(mailData, function(error, response){
		  if(error) {
			
		     console.log("Error sending mail please check "+error);
		     
		      res.send(JSON.stringify({"status_code":"403","status_message":"Error sending mail"}));
		  }
		  else
		  {
		  console.log("Message sent: " + JSON.stringify(response));
		  res.send(JSON.stringify(response));
		  }
		});
    }

,
mailPaymentService: async (req, res) => {
	console.log(req.body)
	var toAddress = req.body.to_address;
	var emailBody = req.body.email_body;
	var subject = req.body.subject;
	var name = req.body.name;
	var course = req.body.course;
    	
	/*	var smtpTransport = nodemailer.createTransport(mandrillTransport({
		    auth: {
		      apiKey : 'WfHaBeLBBL0LO9POyRHmSg'
		    }
		}));*/
		
		const mailTransport = nodemailer.createTransport({    
    host: "smtpout.secureserver.net",  
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
        user: "admin@bharatyogavidyakendra.in",
        pass: "Bharat#1974" 
    }
});

mailTransport.use('compile', hbs(handlebarOptions))
		
		
		let mailData={
		   from : 'admin@bharatyogavidyakendra.in',
		   to : toAddress,
		   subject : subject,
		   template : 'registrationemail',
		    context:{
        name: name, 
        course: course 
    }
		};
		console.log(mailData);
		
		mailTransport.sendMail(mailData, function(error, response){
		  if(error) {
			console.log(error)
		     throw new Error("Error in sending email");
		  }
		  console.log("Message sent: " + JSON.stringify(response));
		  res.send(JSON.stringify(response));
		});
    }
   
};