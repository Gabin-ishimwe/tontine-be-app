import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { afterOneSec } from './generate_otp';

//Delete OTP after one minute of creation
export const deleteOtpTask = (email: string, now: 'now' | undefined) => {
  return cron.schedule(
    now ? afterOneSec() : afterOneHour(),
    async function job() {
      //Deleting OTP from database
      const isDeleted = await new UsersService(new PrismaService()).deleteOTP(
        email,
      );
      if (isDeleted) {
        console.log('OTP: deleted successfully,', email);
      } else {
        console.log(
          'OTP: delete failed or account is already verified,',
          email,
        );
      }
    },
  );
};

function afterOneHour(): string {
  const date = new Date();
  return `${date.getSeconds()} ${date.getMinutes()} ${
    date.getHours() + 1
  } ${date.getDate()} ${date.getMonth() + 1} ${date.getDay()}`;
}
