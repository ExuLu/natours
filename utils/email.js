const nodemailer = require('nodemailer');
const { options } = require('../routes/userRoutes');

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const mailOptions = {
  from: 'Alena Sharai <alena.sharai98@gmail.com',
  to: options.email,
  subject: options.subject,
  text: options.message,
};
