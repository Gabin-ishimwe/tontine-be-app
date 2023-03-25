import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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

  async findOnePool(id: string) {
    try {
      const data = await this.prismaService.pool.findUnique({ where: { id } });
      if (!data) return new NotFoundException({ message: 'Pool not found' });
      return data;
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAllPool() {
    try {
      return await this.prismaService.pool.findMany({
        include: { wallet: true, members: true },
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOnePool(id: string) {
    try {
      return await this.prismaService.pool.delete({ where: { id } });
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
