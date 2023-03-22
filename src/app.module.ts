import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [PrismaModule, PoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
