import { IsAlphanumeric, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsAlphanumeric()
  @Length(5, 20)
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  about?: string;
}
