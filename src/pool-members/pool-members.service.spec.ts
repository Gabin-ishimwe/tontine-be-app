import { Test, TestingModule } from '@nestjs/testing';
import { PoolMembersService } from './pool-members.service';

describe('PoolMembersService', () => {
  let service: PoolMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolMembersService],
    }).compile();

    service = module.get<PoolMembersService>(PoolMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
