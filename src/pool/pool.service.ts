import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { generate } from 'otp-generator';
import { EmailService } from 'src/emails/emails.service';
import { computeCycleTime } from 'src/helpers/pool.helper';
import { PoolMembersRepository } from 'src/pool-members/pool-members.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { InviteResponse } from './dto/invite-response.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolRepository } from './pool.repository';

@Injectable()
export class PoolService {
  constructor(
    private poolRepository: PoolRepository,
    private prismaService: PrismaService,
    private emailService: EmailService,
    private poolMembersRepository: PoolMembersRepository,
  ) {}

  async create(createPoolDto: CreatePoolDto, userId: string) {
    try {
      // generate invitation code
      const inviteCode = Number(
        generate(4, {
          digits: true,
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        }),
      );
      createPoolDto.inviteCode = inviteCode;
      createPoolDto.createdBy = userId;
      const pool = await this.poolRepository.createPool(createPoolDto);
      return pool;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // new endpoint to show current infos of the pool
  // if he/she modifies the infos we will need to recompute the cycle time and on......
  async updatePool(id: string, userId: string, updatePool: UpdatePoolDto) {
    try {
      const findPool = await this.poolRepository.findOnePool(id);
      if (findPool.createdBy !== userId) {
        throw new BadRequestException("Pool doesn't belong to you");
      }
      return await this.poolRepository.updateOnePool(id, updatePool);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // endpoint to create pool invitation code
  async poolInvitationCode(poolId: string, userId: string) {
    try {
      const findPool = await this.poolRepository.findOnePool(poolId);
      if (findPool.createdBy !== userId) {
        throw new BadRequestException("Pool doesn't belong to you");
      }
      const inviteCode = Number(
        generate(4, {
          digits: true,
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        }),
      );
      const updatePool = await this.poolRepository.updateOnePool(poolId, {
        inviteCode,
      });
      return { message: 'Invitation code created', data: updatePool };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // endpoint to approve/reject user (ADMIN)
  async respondToJoin(inviteResponse: InviteResponse) {
    try {
      const { userId, poolId, status } = inviteResponse;
      // get pool membership
      const poolMembership =
        await this.poolMembersRepository.findPoolMembership(userId, poolId);

      const user = poolMembership.member;
      const pool = poolMembership.pool;

      if (status === 'ACCEPTED') {
      }

      // update (accept or reject)
      // if update => add user to pool
      //    update user model
      //    update poolMembership
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // endpoint to request to join pool
  async requestToJoin(inviteCode: number, userId: string) {
    try {
      const findPool = await this.poolRepository.findByInviteCode(inviteCode);
      const expectedTimeStart = new Date(findPool.expectedTimeStart);
      const today = new Date();
      // check if pool has started
      if (expectedTimeStart.toDateString() > today.toDateString()) {
        return new BadRequestException({ message: 'Pool has arleady started' });
      }

      // check if user has arleady sent the invite
      const existingMembership =
        await this.prismaService.poolMembership.findFirst({
          where: {
            memberId: userId,
            poolId: findPool.id,
          },
        });

      if (existingMembership) {
        if (existingMembership.status === 'PENDING')
          return { message: 'Pool Invitation arleady sent' };

        if (existingMembership.status === 'ACCEPTED')
          return { message: 'Pool Invitation has been accepted' };

        if (existingMembership.status === 'REJECTED') {
          const updateMembership =
            await this.prismaService.poolMembership.update({
              where: { id: existingMembership.id },
              data: { status: 'PENDING' },
              include: {
                member: {
                  include: {
                    bank: true,
                  },
                },
                pool: {
                  include: {
                    createdByUser: true,
                  },
                },
              },
            });
          const emailDetails = {
            email: updateMembership.pool.createdByUser.email,
            firstName: updateMembership.member.bank.firstName,
            lastName: updateMembership.member.bank.lastName,
          };
          // send email to pool creator
          this.emailService.requestJoinEmail(emailDetails);
          return {
            message: 'Request sent to pool admin',
            data: updateMembership,
          };
        }
      }

      // create pool-member
      const poolMemberShip = await this.prismaService.poolMembership.create({
        data: {
          memberId: userId,
          poolId: findPool?.id,
        },
        include: {
          member: {
            include: {
              bank: true,
            },
          },
          pool: {
            include: {
              createdByUser: true,
            },
          },
        },
      });
      const emailDetails = {
        email: poolMemberShip.pool.createdByUser.email,
        firstName: poolMemberShip.member.bank.firstName,
        lastName: poolMemberShip.member.bank.lastName,
      };
      // send email to pool creator
      this.emailService.requestJoinEmail(emailDetails);

      // delete property pool & member for security measure
      // delete poolMemberShip.member;
      // delete poolMemberShip.pool;
      return { message: 'Request sent to pool admin', data: poolMemberShip };
      // send
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // activate and start pool when all users are available
  async activatePool(poolId: string) {
    try {
      const findPool = await this.poolRepository.findOnePool(poolId);
      const invitedMembers = findPool.poolMembers?.length;
      const currentMembers = findPool.numberOfParticipants?.length;
      if (invitedMembers != currentMembers)
        return new BadRequestException('Not enough users to activate the pool');

      const computePoolCycle = computeCycleTime({
        sprintTime: findPool.sprintTime,
        sprintTimeType: findPool.sprintTimeType,
        numberOfParticipants: findPool.numberOfParticipants,
      });

      // update wallet
      // update pool
      const updatedPool = await this.poolRepository.activatePool(poolId, {
        cycleTime: computePoolCycle.cycleTime,
        cycleTimeType: computePoolCycle.cycleTimeType,
        isActive: true,
      });

      return { message: 'Pool activated', pool: updatedPool };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePool(id: string) {
    try {
      return await this.poolRepository.findOnePool(id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllPool() {
    try {
      return await this.poolRepository.findAllPool();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updatePoolDto: UpdatePoolDto) {
    return `This action updates a #${id} pool`;
  }

  async deleteOnePool(id: string) {
    try {
      return await this.poolRepository.deleteOnePool(id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllPool() {
    return await this.poolRepository.deleteAllPool();
  }
}
