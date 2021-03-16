const argv = require('yargs').argv;

if (!process.env.SENDGRID_API_KEY) {
  console.log("Environment variable SENDGRID_API_KEY is not set. Aborting")
  process.exit(1)
}

const printHelp = function () {
  process.stdout.write("\nUSAGE: \n");
  process.stdout.write('node send_email.js <dest_email> <title> <body> [-h]\n');
};

if (argv.h) {
  printHelp();
  process.exit(0);
}

const args = process.argv.slice(2); //to subject content
if (args.length < 2) {
  printHelp();
  process.exit(1); //FAILURE
}
// var [to, subject, content] = args; //node >= 6
const to = args[0], subject = args[1], content = args[2] || '';

const helper = require('sendgrid').mail

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: to,
  //FIXME: You are not authorized to send from that email address, need to investigate how to make a valid sender
  from: new helper.Email("josep12@sendgrid.net", "Josep SendGrid"),
  subject: subject,
  text: content,
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)

    if (error.response) {
      // Extract error msg
      const { message, code, response } = error;

      // Extract response msg
      const { headers, body } = response;

      console.error(body);
    }

    process.exit(1)
  })
