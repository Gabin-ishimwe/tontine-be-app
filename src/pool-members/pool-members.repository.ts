import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PoolMembersRepository {
  constructor(private prismaService: PrismaService) {}

  async findPoolMembership(userId: string, poolId: string): Promise<any> {
    try {
      const poolMembership = await this.prismaService.poolMembership.findFirst({
        where: {
          memberId: userId,
          poolId,
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
      if (!poolMembership)
        return new NotFoundException({ message: 'Pool membership not found' });

      return poolMembership;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
