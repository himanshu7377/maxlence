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
    //   const origin = req.get("origin"); // Get the origin from the request headers

      const mailOptions = {
        from: "him.singh7069@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Click the following link to verify your email: http://localhost:5173/verifyemail/${verificationToken}`,

        // HTML version of the email can be provided here as well
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  },
};

module.exports = emailService;
