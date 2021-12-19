const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
const sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${process.env.ACTIVATION_URL + confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
module.exports = {
  sendConfirmationEmail,
};
