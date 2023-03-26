import { Injectable } from '@nestjs/common';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';

@Injectable()
export class InvitedUsersService {
  create(createInvitedUserDto: CreateInvitedUserDto) {
    return 'This action adds a new invitedUser';
  }

  findAll() {
    return `This action returns all invitedUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitedUser`;
  }

  update(id: number, updateInvitedUserDto: UpdateInvitedUserDto) {
    return `This action updates a #${id} invitedUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitedUser`;
  }
}
