import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import otp from 'otp-generator';
import { computeCycleTime } from 'src/helpers/pool.helper';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolRepository } from './pool.repository';

@Injectable()
export class PoolService {
  constructor(private poolRepository: PoolRepository) {}

  async create(createPoolDto: CreatePoolDto) {
    try {
      // const { sprintTime, sprintTimeType, numberOfParticipants } =
      //   createPoolDto;
      // const computePoolCycle = computeCycleTime({
      //   sprintTime,
      //   sprintTimeType,
      //   numberOfParticipants,
      // });

      // createPoolDto.cycleTime = computePoolCycle.cycleTime.toString();
      // createPoolDto.cycleTimeType = computePoolCycle.cycleTimeType;

      // generate invitation code
      const inviteCode = otp.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const pool = await this.poolRepository.createPool(createPoolDto);
      return pool;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // new endpoint to show current infos of the pool
  // if he/she modifies the infos we will need to recompute the cycle time and on......
  async updatePool(id: string, updatePool: UpdatePoolDto) {
    try {
      return await this.poolRepository.updateOnePool(id, updatePool);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // endpoint to create pool invitation code
  async poolInvitationCode(poolId: string) {
    try {
      await this.poolRepository.findOnePool(poolId);
      const inviteCode = otp.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const updatePool = await this.poolRepository.updateOnePool(
        poolId,
        inviteCode,
      );
      return { message: 'Invitation code created', data: updatePool };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // endpoint to approve/reject user (ADMIN)

  // endpoint to request to join pool

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

      const updatedPool = await this.poolRepository.updateOnePool(poolId, {
        cycleTime: computePoolCycle.cycleTime,
        cycleTimeType: computePoolCycle.cycleTimeType,
        isActive: true,
      });

      // update wallet

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
