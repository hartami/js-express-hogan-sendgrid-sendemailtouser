var express = require("express");
var router = express.Router();
var Hogan = require("hogan.js");
var fs = require("fs");

//var template = fs.readFileSync("./views/email.hjs", "utf-8");
var template = fs.readFileSync("./views/emailinlined.hjs", "utf-8");
var compliledTemplate = Hogan.compile(template);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Reset Password" });
});

router.post("/form", function(req, res) {
  var initialusername = "Customer";
  var username = req.body.username; //to access req object body for username
  var emailaddress = req.body.emailaddress;

  if (username != "") {
    initialusername = username;
  } else {
    initialusername = initialusername;
  }

  res.render("postsubmit", { firstName: initialusername, email: emailaddress });

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );

  const msg = {
    to: emailaddress,
    from: "noreply@ahartami.com",
    subject: "Reset Password",
    html: compliledTemplate.render({ firstName: initialusername })
  };
  sgMail.send(msg);
});

router.get("/form", function(req, res) {
  //res.sendfile("./form.html");  //i am sending file to client browser which is of html
  res.render("index", { firstName: "Customer" });
});

router.get("/preview", function(req, res) {
  res.render("email", { firstName: "Customer" });
});

module.exports = router;
