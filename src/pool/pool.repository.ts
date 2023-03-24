import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';

@Injectable()
export class PoolRepository {
  constructor(private prismaService: PrismaService) {}

  async createPool(createPool: CreatePoolDto) {
    try {
      return await this.prismaService.pool.create({
        data: {
          ...createPool,
          wallet: {
            create: {
              amount: 0,
            },
          },
        },
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPool() {
    try {
      return await this.prismaService.pool.findMany();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllPool() {
    try {
      return await this.prismaService.pool.deleteMany();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
