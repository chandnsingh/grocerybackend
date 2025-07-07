import nodemailer from "nodemailer";

// For debug purposes only — can be removed later
console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass length:", process.env.EMAIL_PASS?.length);

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Grocery Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
