import { IsDefined, IsEmail, IsStrongPassword, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsDefined({ message: 'please enter email' })
  email: string;

  @Length(5, 15)
  @IsDefined({ message: 'password required' })
  @IsStrongPassword(undefined, { message: 'please enter a strong password' })
  password: string;
}
