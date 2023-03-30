import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TimeType } from './create-pool.dto';

export class UpdatePoolDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsInt()
  @IsOptional()
  amountPerSprint: number;

  @IsNumber()
  @IsOptional()
  sprintTime: number;

  @IsString()
  @IsEnum(TimeType)
  @IsOptional()
  sprintTimeType: TimeType;

  // @IsDateString()
  @IsString()
  @IsOptional()
  cycleTime: string;

  @IsString()
  @IsOptional()
  @IsEnum(TimeType)
  cycleTimeType: string;

  @IsNumber()
  @Min(3)
  @IsOptional()
  numberOfParticipants: number;

  @IsDateString()
  @IsOptional()
  expectedTimeStart: string;

  @IsOptional()
  inviteCode: number;

  @IsOptional()
  createdBy: string;
}
