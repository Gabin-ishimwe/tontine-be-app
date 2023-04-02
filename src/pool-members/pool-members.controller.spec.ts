import { Test, TestingModule } from '@nestjs/testing';
import { PoolMembersController } from './pool-members.controller';
import { PoolMembersService } from './pool-members.service';

describe('PoolMembersController', () => {
  let controller: PoolMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoolMembersController],
      providers: [PoolMembersService],
    }).compile();

    controller = module.get<PoolMembersController>(PoolMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
