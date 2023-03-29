import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsAlphanumeric()
  @Length(5, 20)
  username: string;

  @IsString()
  image: string;

  @IsString()
  @Length(3, 100)
  about: string;
}
