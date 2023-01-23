import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GaugeService } from './gauge.service';
import { CreateGaugeDto } from './dto/create.dto';
import { UpdateGaugeDto } from './dto/update.dto';
import { GetGaugeDto } from './dto/get.dto';

@Controller('gauge')
export class GaugeController {
  constructor(private readonly service: GaugeService) {}

  @Post()
  create(@Body() createTypeDto: CreateGaugeDto) {
    return this.service.create(createTypeDto);
  }

  @Get()
  findAll(@Query() query: GetGaugeDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateGaugeDto) {
    return this.service.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
