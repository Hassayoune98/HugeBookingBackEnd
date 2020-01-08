
var async = require("async");
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

module.exports = {sendMail}

async function sendMail(user,host,userPassword){

nodemailer.createTestAccount((err, account) => {
  let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
          user: 'Application.Test.Project@gmail.com', //Gmail username
          pass: 'ApplicationTest45' // Gmail password
      }
  });

  if(userPassword===""){
   
    var mailOptions = {
        from: '"Mobelite Application" <admin@artisansweb.net>',
        to: user.email, // Recepient email address. Multiple emails can send separated by commas
        subject: 'Welcome Email',
        text:
        'Please click on the following link, or paste this into your browser to change your custom password:\n\n' +
        'http://' + host + 'users/reset?restToken=' + user.resetPasswordToken + '\n\n' +
        '.\n'
    };  

  }
  else{

    var mailOptions = {
        from: '"Mobelite Application" <admin@artisansweb.net>',
        to: user.email, // Recepient email address. Multiple emails can send separated by commas
        subject: 'Welcome Email',
        text: 'welcome here is your password for this app ' + userPassword +'.\n\n' +
        'Please click on the following link, or paste this into your browser to change your custom password:\n\n' +
        'http://' + host + 'users/reset?restToken=' + user.resetPasswordToken + '\n\n' +
        '.\n'
    };  

    
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
  });
});
}