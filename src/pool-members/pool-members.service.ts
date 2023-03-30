import { Injectable } from '@nestjs/common';
import { CreatePoolMemberDto } from './dto/create-pool-member.dto';
import { UpdatePoolMemberDto } from './dto/update-pool-member.dto';

@Injectable()
export class PoolMembersService {
  create(createPoolMemberDto: CreatePoolMemberDto) {
    return 'This action adds a new poolMember';
  }

  findAll() {
    return `This action returns all poolMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poolMember`;
  }

  update(id: number, updatePoolMemberDto: UpdatePoolMemberDto) {
    return `This action updates a #${id} poolMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} poolMember`;
  }
}
