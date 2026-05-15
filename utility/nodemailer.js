import  nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendmail = (to,sub,msg) => {
    transporter.sendMail({
        to:to,
        subject: sub,
        html: msg
    });
};

export default sendmail;