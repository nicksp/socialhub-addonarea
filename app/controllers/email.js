'use strict';

const nodemailer = require('nodemailer');
const mg         = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'key-1-at3foewo876l2m9xlkue0g-igj3t75',
    domain: 'sandbox2f4f0bf94b6a431883136985112fc24c.mailgun.org'
  }
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

exports.sendEmail = (req) => {
  const emailBody = req.body.emailBody;

  nodemailerMailgun.sendMail({
    from: 'test@example.org',
    to: 'addons-test@mailinator.com',
    subject: 'A new request to enable addon',
    html: emailBody
  }, (err, data) => {
    if (err) {
      console.log('sendEmail: error' + err);
    } else {
      console.log('sendEmail: response: ' + data);
    }
  });
};
