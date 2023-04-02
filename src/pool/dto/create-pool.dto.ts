import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
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
  @IsNumber()
  sprintTime: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TimeType)
  sprintTimeType: TimeType;

  @IsOptional()
  cycleTime: number;

  @IsString()
  @IsOptional()
  @IsEnum(TimeType)
  cycleTimeType: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(3)
  numberOfParticipants: number;

  @IsDateString()
  @IsNotEmpty()
  expectedTimeStart: string;

  @IsOptional()
  inviteCode: number;

  @IsOptional()
  createdBy: string;
}
