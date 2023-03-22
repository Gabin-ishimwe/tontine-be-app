import { IsInt, IsString } from 'class-validator';

export class CreatePoolDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsInt()
  amountPerSprint: number;

  @IsString()
  sprintTime: string;

  @IsString()
  cycleTime: string;

  @IsString()
  numberOfParticipant: number;
}
