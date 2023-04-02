import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Pools } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';

@Injectable()
export class PoolRepository {
  constructor(private prismaService: PrismaService) {}

  async createPool(createPool: CreatePoolDto) {
    try {
      return await this.prismaService.pools.create({
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

  async updateOnePool(id: string, data: any) {
    try {
      return await this.prismaService.pools.update({
        where: { id },
        data,
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async activatePool(
    id: string,
    data: { cycleTime: number; cycleTimeType: string; isActive: boolean },
  ) {
    try {
      return await this.prismaService.pools.update({
        where: { id },
        data: {
          ...data,
          wallet: {
            update: {
              isActive: true,
            },
          },
        },
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePool(id: string): Promise<any | Pools> {
    try {
      const data = await this.prismaService.pools.findUnique({
        where: { id },
        include: { wallet: true, poolMembers: true, createdByUser: true },
      });
      if (!data) return new NotFoundException({ message: 'Pool not found' });

      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findByInviteCode(code: number): Promise<any> {
    try {
      const data = await this.prismaService.pools.findFirst({
        where: {
          inviteCode: code,
        },
      });
      if (!data)
        return new NotFoundException({
          message: `Pool with invite code ${code} code not found`,
        });

      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAllPool() {
    try {
      return await this.prismaService.pools.findMany({
        include: { wallet: true, poolMembers: true, createdByUser: true },
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOnePool(id: string) {
    try {
      return await this.prismaService.pools.delete({ where: { id } });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllPool() {
    try {
      return await this.prismaService.pools.deleteMany();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
