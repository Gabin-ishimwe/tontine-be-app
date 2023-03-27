import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { deleteOtpTask } from './delete_otp';

dotenv.config();

const FROM_EMAIL: string = process.env.SENDER_MAIL!;
const FROM_MAIL_PASSWORD: string = process.env.SENDER_MAIL_PASSWORD!;

const sendEmail = ({
  email,
  firstName,
  lastName,
  otp,
}: {
  email: string;
  firstName: string;
  lastName: string;
  otp: number;
}) => {
  const TO_EMAIL: string = email;
  //Creating transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: FROM_EMAIL,
      pass: FROM_MAIL_PASSWORD,
    },
  });

  // Define the message to be sent
  const mailMessage = {
    from: `"TONTINO App" <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    subject: `Verify Account - ${firstName} ${lastName}`,
    html: `
            <div style="padding: 10px 0;">
                <h3> ${firstName} ${lastName} thank you for registering on our application! </h3> 
                <h4> Enter OTP below to verify your email </h4>
                <a style="border-radius: 5px;font-size:20px; margin-bottom: 10px; text-decoration: none; color: white; padding: 10px 20px; cursor: pointer; background: #008D41;"> 
                ${otp} </a>
                <p> And please note that this will expire in two hours </p>
            </div>
            `,
  };
  // Send the message using the created transport object
  transporter.sendMail(mailMessage, (error) => {
    if (error) {
      console.log('OTP: Email service not working,', email, error.message);
    } else {
      console.log('OTP: email sent,', email);
      deleteOtpTask(email, undefined).start();
    }
  });
};

export { sendEmail };
