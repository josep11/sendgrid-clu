var argv = require('yargs').argv;

if (!process.env.SENDGRID_API_KEY){
  console.log("Environment variable SENDGRID_API_KEY is not set. Aborting")
  process.exit(1)
}

var printHelp = function(){
  process.stdout.write("\nUSAGE: \n");
  process.stdout.write('node send_email.js <dest_email> <title> <body> [-h]\n');
};

if (argv.h){
  printHelp();
  process.exit(0);
}

var args = process.argv.slice(2); //to subject content
if (args.length < 2){
  printHelp();
  process.exit(1); //FAILURE
}
// var [to, subject, content] = args; //node >= 6
var to = args[0], subject = args[1], content = args[2] || '';

//https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html#-Request-Body-Parameters
  var helper = require('sendgrid').mail
  //TODO: parametrize the sender
  from_email = new helper.Email("josep_a11@sendgrid.net", "Josep SendGrid")
  to_email = new helper.Email(to)
  subject = subject
  content = new helper.Content("text/html", content)
  mail = new helper.Mail(from_email, subject, to_email, content)

  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  // console.log(request)
  sg.API(request, function (response) {
    // console.log(response.statusCode)
    // console.log(response.body)
    // console.log(response.headers)
    if (response.statusCode != 202)
      process.exit(1); //Error code
    else
      console.log('Email sent OK');
  })
