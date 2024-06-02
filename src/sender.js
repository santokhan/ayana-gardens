import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
import { makeEmail } from "./email-template.js";

configDotenv();

const recipients = [
  "arsh@aos.ae",
  "info@ayanagardens.com",
  "santokhan1999@outlook.com",
];

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.EMAIL_USER || "aosayana@gmail.com", // Your email address
    pass: process.env.EMAIL_PASS || "mrts haal fdhf qikm", // Your email password (consider using environment variables for security)
  },
  debug: true,
  logger: true,
});

async function sendEmail(data, callBack = () => { }) {
  const minifiedHTMLEmail = makeEmail(data);

  // console.log(
  //   // minifiedHTMLEmail, 
  //   transporter.options
  // );
  // // return

  recipients.forEach((recipient) => {
    console.log('Sending email to: ', recipient);
    transporter.sendMail(
      {
        to: recipient, // List of recipients
        subject: "Ayana Enquiry", // Subject line
        // text: "Hello world!", // Plain text body
        html: minifiedHTMLEmail || "", // HTML body
      },
      (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info);
        callBack()
      }
    );
  });

  // transporter.sendMail(
  //   {
  //     to: "santokhan1999@gmail.com",
  //     bcc: recipients, // List of recipients
  //     subject: "Ayana Enquiry", // Subject line
  //     // text: "Hello world!", // Plain text body
  //     html: minifiedHTMLEmail || "", // HTML body
  //   },
  //   (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log("Message sent: %s", info.messageId);
  //   }
  // );
}

export default sendEmail;
