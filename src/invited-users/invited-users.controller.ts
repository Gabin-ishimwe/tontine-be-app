import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitedUsersService } from './invited-users.service';
import { CreateInvitedUserDto } from './dto/create-invited-user.dto';
import { UpdateInvitedUserDto } from './dto/update-invited-user.dto';

@Controller('invited-users')
export class InvitedUsersController {
  constructor(private readonly invitedUsersService: InvitedUsersService) {}

  @Post()
  create(@Body() createInvitedUserDto: CreateInvitedUserDto) {
    return this.invitedUsersService.create(createInvitedUserDto);
  }

  @Get()
  findAll() {
    return this.invitedUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitedUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitedUserDto: UpdateInvitedUserDto) {
    return this.invitedUsersService.update(+id, updateInvitedUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedUsersService.remove(+id);
  }
}
