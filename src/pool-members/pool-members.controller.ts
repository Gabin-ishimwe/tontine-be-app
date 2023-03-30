import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoolMembersService } from './pool-members.service';
import { CreatePoolMemberDto } from './dto/create-pool-member.dto';
import { UpdatePoolMemberDto } from './dto/update-pool-member.dto';

@Controller('pool-members')
export class PoolMembersController {
  constructor(private readonly poolMembersService: PoolMembersService) {}

  @Post()
  create(@Body() createPoolMemberDto: CreatePoolMemberDto) {
    return this.poolMembersService.create(createPoolMemberDto);
  }

  @Get()
  findAll() {
    return this.poolMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoolMemberDto: UpdatePoolMemberDto) {
    return this.poolMembersService.update(+id, updatePoolMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poolMembersService.remove(+id);
  }
}
