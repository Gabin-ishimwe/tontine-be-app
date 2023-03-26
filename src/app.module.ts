import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PoolModule } from './pool/pool.module';
import { WalletModule } from './wallet/wallet.module';
import { InvitedUsersModule } from './invited-users/invited-users.module';

@Module({
  imports: [PrismaModule, PoolModule, WalletModule, InvitedUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
