import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllWallet() {
    try {
      return this.prismaService.wallet.findMany({ include: { pool: true } });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
