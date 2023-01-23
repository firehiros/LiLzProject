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
import { MesurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create.dto';
import { UpdateMeasurementDto } from './dto/update.dto';
import { GetMeasurementDto } from './dto/get.dto';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly service: MesurementService) {}

  @Post()
  create(@Body() createTypeDto: CreateMeasurementDto) {
    return this.service.create(createTypeDto);
  }

  @Get()
  findAll(@Query() query: GetMeasurementDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateMeasurementDto) {
    return this.service.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
