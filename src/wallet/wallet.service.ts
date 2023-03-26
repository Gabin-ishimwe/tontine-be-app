import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    private prismaService: PrismaService,
    private walletRepository: WalletRepository,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.prismaService.wallets.create({
      data: {
        amount: createWalletDto.amount,
        poolId: createWalletDto.poolId,
      },
    });
  }

  findAll() {
    return this.walletRepository.findAllWallet();
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async deleteAll() {
    return await this.prismaService.wallets.deleteMany();
  }
}
