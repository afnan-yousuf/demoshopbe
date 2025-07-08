const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL,
        pass: process.env.GMAILPASS
    }
})

const sendEmailforVerification = async (email,token)=>{

const link = `${process.env.FRONTEND_URL}/verify/${token}`;

  await transporter.sendMail({
    from: '"Demo Shop" <no-reply@demoshop.com>',
    to: email,
    subject: "Verify Your Email",
    html: `
        <img src='https://images.seeklogo.com/logo-png/22/2/aptech-computer-education-logo-png_seeklogo-223325.png' width='200' />
      <h2>Welcome to Demoshop!</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${link}" style="padding: 10px 15px; background-color: #28a745; color: #fff; text-decoration: none;">Verify Email</a>
    `,
  });

}

module.exports = sendEmailforVerification