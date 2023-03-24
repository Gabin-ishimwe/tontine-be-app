import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinDate,
} from 'class-validator';

export enum TimeType {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
}

export class CreatePoolDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsInt()
  @IsNotEmpty()
  amountPerSprint: number;

  @IsNotEmpty()
  @IsDateString()
  sprintTime: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TimeType)
  sprintTimeType: string;

  @IsDateString()
  @IsOptional()
  cycleTime: string;

  @IsString()
  @IsOptional()
  @IsEnum(TimeType)
  cycleTimeType: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(3)
  numberOfParticipant: number;
}
