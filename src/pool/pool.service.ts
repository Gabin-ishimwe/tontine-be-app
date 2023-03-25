import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { computeCycleTime } from 'src/helpers/pool.helper';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolRepository } from './pool.repository';

@Injectable()
export class PoolService {
  constructor(private poolRepository: PoolRepository) {}

  async create(createPoolDto: CreatePoolDto) {
    try {
      const { sprintTime, sprintTimeType, numberOfParticipants } =
        createPoolDto;
      const computePoolCycle = computeCycleTime({
        sprintTime,
        sprintTimeType,
        numberOfParticipants,
      });

      createPoolDto.cycleTime = computePoolCycle.cycleTime.toString();
      createPoolDto.cycleTimeType = computePoolCycle.cycleTimeType;
      const pool = await this.poolRepository.createPool(createPoolDto);
      return pool;
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
