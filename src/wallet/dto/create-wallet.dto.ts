import { IsInt, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsInt()
  amount: number;

  @IsString()
  poolId: string;
}
