import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolRepository } from './pool.repository';

@Injectable()
export class PoolService {
  constructor(private poolRepository: PoolRepository) {}

  async create(createPoolDto: CreatePoolDto) {
    try {
      const {
        sprintTime,
        sprintTimeType,
        cycleTime,
        cycleTimeType,
        numberOfParticipant,
      } = createPoolDto;
      const pool = await this.poolRepository.createPool(createPoolDto);
      return pool;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.poolRepository.findAllPool();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pool`;
  }

  update(id: number, updatePoolDto: UpdatePoolDto) {
    return `This action updates a #${id} pool`;
  }

  remove(id: number) {
    return `This action removes a #${id} pool`;
  }
}
