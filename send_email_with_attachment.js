// var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

//CALL
//node send_email_with_attachment.js my@hotmail.com "Title" "Content" "imgFullPath"
//node send_email_with_attachment.js my@hotmail.com "Title" "Content" "C:\\casperjs\\img\\error_2016-8-18.png"

var args = process.argv.slice(2); //to subject content
if (args.length < 3){
  console.log("There are not enough params to send the email")
  process.exit(1); //FAILURE
}

var fs = require('fs'),
    file = args[3], //parametritzar si es vol
    attachmentName = file.split('\\').pop(),
    imageData = fs.readFileSync(file);

// var [to, subject, content, attachments] = args; //node >= 6
var to = args[0], subject = args[1], content = args[2] || '';

//https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html#-Request-Body-Parameters
  var helper = require('sendgrid').mail
  //TODO: parametrize the sender
  from_email = new helper.Email("josep_a11@sendgrid.net", "Josep SendGrid")
  to_email = new helper.Email(to)
  subject = subject
  content = new helper.Content("text/plain", content)
  mail = new helper.Mail(from_email, subject, to_email, content)

  attachment = new helper.Attachment()
  attachment.setContent(imageData.toString('base64'))
  attachment.setType("image/png")
  attachment.setFilename(attachmentName)
  attachment.setDisposition("inline")
  attachment.setContentId("banner")
  mail.addAttachment(attachment)



  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  // console.log(request)
  // console.log(request.body.attachments)
  sg.API(request, function (response) {
    // console.log(response.statusCode)
    // console.log(response.body)
    // console.log(response.headers)
    if (response.statusCode != 202)
      process.exit(1); //Error code
    else
      console.log('Email sent OK');
  })
