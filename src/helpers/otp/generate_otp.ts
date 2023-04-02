import * as cron from 'node-cron';
import { generate } from 'otp-generator';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { sendEmail } from './send_email';

//Send an email after one sec
export const otpCron = (user: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  return cron.schedule(afterOneSec(), async function job() {
    //Generating OTP
    const uniqueOTP = Number(
      generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      }),
    );
    //Sending OTP to database
    const otp = await new UsersService(new PrismaService()).sendOTP({
      email: user.email,
      otp: uniqueOTP,
    });
    //Sending OTP to user email
    if (otp)
      sendEmail({
        email: otp.email,
        otp: otp.otp,
        firstName: user.firstName,
        lastName: user.lastName,
      });
  });
};

export function afterOneSec(): string {
  const date = new Date();
  return `${
    date.getSeconds() + 1
  } ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
    date.getMonth() + 1
  } ${date.getDay()}`;
}
