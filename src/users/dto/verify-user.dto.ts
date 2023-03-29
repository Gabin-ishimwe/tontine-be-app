import { IsDefined, IsEmail, IsNumber, IsPositive, Max } from 'class-validator';

export class VerifyUserDto {
  @IsEmail()
  @IsDefined({ message: 'please enter email' })
  email: string;

  @IsDefined({ message: 'please enter an otp' })
  @IsNumber()
  @IsPositive()
  @Max(9999, { message: 'OTP must have 4 digits' })
  otp: number;
}
