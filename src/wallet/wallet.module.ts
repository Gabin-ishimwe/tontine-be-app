import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  imports: [PrismaModule],
  exports: [WalletService],
})
export class WalletModule {}
