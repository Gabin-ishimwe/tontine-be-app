import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';

dotenv.config();

@Injectable()
export class EmailService {
  signUpEmail() {}
  requestJoinEmail({ email, firstName, lastName }) {
    const FROM_EMAIL: string = process.env.SENDER_MAIL!;
    const FROM_MAIL_PASSWORD: string = process.env.SENDER_MAIL_PASSWORD!;
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
      to: email,
      subject: `Request to join pool - ${firstName} ${lastName}`,
      html: `
                <div style="padding: 10px 0;">
                    <h3> User ${firstName} ${lastName} is requesting to join your pool </h3> 
                </div>
                `,
    };
    // Send the message using the created transport object
    transporter.sendMail(mailMessage, (error) => {
      if (error) {
        console.log('OTP: Email service not working,', error.message);
      } else {
        console.log('OTP: email sent');
      }
    });
  }
}
