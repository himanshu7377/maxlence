const nodemailer = require("nodemailer");

const emailService = {
  async sendEmailVerification(email, verificationToken, origin) {
    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "him.singh7069@gmail.com",
          pass: process.env.EMAILPASSWORD, // Custom app password from gmail
        },
      });

      // Send email
   

      const mailOptions = {
        from: "him.singh7069@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Click the following link to verify your email: http://localhost:5173/verifyemail/${verificationToken}`,


      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  },
  async sendPasswordResetLink(email, resetToken, origin) {
    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "him.singh7069@gmail.com",
          pass: process.env.EMAILPASSWORD, // Custom app password from gmail
        },
      });

      // Send email
      const mailOptions = {
        from: "him.singh7069@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: ${origin}/resetpassword/${resetToken}`,

      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Password reset link sent: ", info.response);
    } catch (error) {
      console.error("Error sending password reset link: ", error);
      throw error;
    }
  },
};




module.exports = emailService;
