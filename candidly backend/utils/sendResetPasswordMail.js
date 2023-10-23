const nodemailer = require("nodemailer");
const winston = require("winston");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587, // Use port 587 for TLS
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

function sendResetPasswordEmail(email, verificationToken) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Candidly Password",
    text: `Click the following link to reset your password: http://localhost:3001/api/users/reset_password/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      winston.error(error);
    } else {
      winston.info("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendResetPasswordEmail,
};
