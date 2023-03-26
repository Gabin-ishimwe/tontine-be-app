import { PartialType } from '@nestjs/swagger';
import { CreateInvitedUserDto } from './create-invited-user.dto';

export class UpdateInvitedUserDto extends PartialType(CreateInvitedUserDto) {}
