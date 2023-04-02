import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PoolMembersController } from './pool-members.controller';
import { PoolMembersRepository } from './pool-members.repository';
import { PoolMembersService } from './pool-members.service';

@Module({
  controllers: [PoolMembersController],
  providers: [PoolMembersService, PoolMembersRepository],
  exports: [PoolMembersRepository],
  imports: [PrismaModule],
})
export class PoolMembersModule {}
