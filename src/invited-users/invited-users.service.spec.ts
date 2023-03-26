import { Test, TestingModule } from '@nestjs/testing';
import { InvitedUsersService } from './invited-users.service';

describe('InvitedUsersService', () => {
  let service: InvitedUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedUsersService],
    }).compile();

    service = module.get<InvitedUsersService>(InvitedUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
