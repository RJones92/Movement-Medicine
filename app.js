// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// GET home route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// POST to home route with a message for movement medicine
app.post("/", function(req, res) {
  const post = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    emailContent: req.body.emailContent
  };
  console.log(post);

  // Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    secure: false, //use SSL
    port: 25, //port for secure SMTP
    auth: {
      user: process.env.my_email_address,
      pass: process.env.my_email_pw
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: process.env.my_email_address,
    to: process.env.my_email_address,
    subject: 'New message from MMO website',
    text: 'Name: ' + post.name + '\nPhone: ' + post.phoneNumber + '\nEmail: ' + post.emailAddress + '\nMessage:\n' + post.emailContent + '\n'
  };


  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});



// Server listening
app.listen(process.env.PORT || 3000, function() {
  console.log("Server now listening on port 3000");
});
