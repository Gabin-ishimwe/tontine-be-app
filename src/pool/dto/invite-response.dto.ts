import { InvitedStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class InviteResponse {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  poolId: string;

  @IsEnum(InvitedStatus)
  status: InvitedStatus;
}
