import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvitedUserRepository {
  constructor(private prismaService: PrismaService) {}
  async findAllInvitedUsers() {
    try {
      return await this.prismaService.invitedMembers.findMany({
        include: { member: true, pool: true },
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOneInvitedMember(id: string) {
    try {
      return await this.prismaService.invitedMembers.delete({ where: { id } });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllInvitedMembers() {
    try {
      return await this.prismaService.invitedMembers.deleteMany();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
