import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PoolModule } from './pool/pool.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [PrismaModule, PoolModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
