import { Module } from '@nestjs/common';
import { InvitedUsersService } from './invited-users.service';
import { InvitedUsersController } from './invited-users.controller';

@Module({
  controllers: [InvitedUsersController],
  providers: [InvitedUsersService]
})
export class InvitedUsersModule {}
