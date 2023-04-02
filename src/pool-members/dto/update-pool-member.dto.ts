import { PartialType } from '@nestjs/swagger';
import { CreatePoolMemberDto } from './create-pool-member.dto';

export class UpdatePoolMemberDto extends PartialType(CreatePoolMemberDto) {}
