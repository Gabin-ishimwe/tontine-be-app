import { Role } from '@prisma/client';
import {
  IsAlpha,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  //User account info
  @IsEmail()
  @IsDefined({ message: 'please enter email' })
  email: string;

  @Length(5, 15)
  @IsDefined({ message: 'password required' })
  @IsStrongPassword(undefined, { message: 'please enter a strong password' })
  password: string;

  @IsDefined({ message: 'phone number required' })
  @IsPhoneNumber('RW', {
    message: 'please enter a valid phone number',
  })
  phone: string;
  //Bank account info
  @IsDefined({ message: 'first name required' })
  @Length(3, 20)
  @IsAlpha()
  firstName: string;
  @Length(3, 20)
  @IsAlpha()
  @IsDefined({ message: 'last name required' })
  lastName: string;

  @IsEnum(['USER', 'ADMIN'])
  @IsOptional()
  role?: Role;
}
