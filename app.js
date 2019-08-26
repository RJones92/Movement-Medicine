// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const post = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    emailContent: req.body.emailContent
  };
  console.log(post);
});



app.listen(3000, function() {
    console.log("Server now listening on port 3000");
});
