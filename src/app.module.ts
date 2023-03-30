import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitedUsersModule } from './invited-users/invited-users.module';
import { PoolModule } from './pool/pool.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [PrismaModule, PoolModule, WalletModule, InvitedUsersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
