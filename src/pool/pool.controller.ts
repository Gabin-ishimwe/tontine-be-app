import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthUser } from 'src/users/users.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolService } from './pool.service';

@Controller({
  path: 'pool',
  version: '1',
})
@UseGuards(AuthGuard)
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Post()
  create(@Body() createPoolDto: CreatePoolDto, @AuthUser() id: string) {
    return this.poolService.create(createPoolDto, id);
  }

  @Post('/activate/:id')
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.poolService.activatePool(id);
  }

  @Get()
  findAll() {
    return this.poolService.findAllPool();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.poolService.findOnePool(id);
  }

  @Patch(':id')
  updatePool(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePoolDto: UpdatePoolDto,
    @AuthUser() userId: string,
  ) {
    return this.poolService.updatePool(id, userId, updatePoolDto);
  }

  @Post('/inviteCode/:id')
  generateInviteCode(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() userId: string,
  ) {
    return this.poolService.poolInvitationCode(id, userId);
  }

  @Post('/joinRequest/:code')
  requestJoinPool(
    @AuthUser() userId: string,
    @Param('code', ParseIntPipe) code: number,
  ) {
    return this.poolService.requestToJoin(code, userId);
  }

  @Delete(':id')
  deleteOnePool(@Param('id', ParseUUIDPipe) id: string) {
    return this.poolService.deleteOnePool(id);
  }

  @Delete()
  remove() {
    return this.poolService.deleteAllPool();
  }
}
