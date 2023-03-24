import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { PoolController } from './pool.controller';
import { PoolRepository } from './pool.repository';
import { PoolService } from './pool.service';

@Module({
  controllers: [PoolController],
  providers: [PoolService, PoolRepository],
  imports: [PrismaModule, WalletModule],
})
export class PoolModule {}
