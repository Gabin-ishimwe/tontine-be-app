import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePoolDto } from './dto/create-pool.dto';
import { UpdatePoolDto } from './dto/update-pool.dto';
import { PoolService } from './pool.service';

@Controller({
  path: 'pool',
  version: '1',
})
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Post()
  create(@Body() createPoolDto: CreatePoolDto) {
    return this.poolService.create(createPoolDto);
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
  update(@Param('id') id: string, @Body() updatePoolDto: UpdatePoolDto) {
    return this.poolService.update(+id, updatePoolDto);
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
