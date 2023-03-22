import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';

@Injectable()
export class PoolService {
  constructor(private prismaService: PrismaService) {}

  async create(createPoolDto: CreatePoolDto) {
    try {
      const {
        title,
        description,
        category,
        amountPerSprint,
        sprintTime,
        cycleTime,
        numberOfParticipant,
      } = createPoolDto;

      const sprintChange = new Date(sprintTime).toLocaleTimeString;
      const cycleChange = new Date(cycleTime);
      const pool = await this.prismaService.pool.create({
        data: {
          title,
          description,
          category,
          amountPerSprint,
          numberOfParticipant,
          wallet: {
            create: {
              amount: 0,
            },
          },
        },
      });
      return pool;
    } catch (error) {}
  }

  findAll() {
    return `This action returns all pool`;
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
