import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MesurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { Measurement } from './entities/measurement.entity';
import { Gauge } from '@/modules/gauges/entities/gauge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement, Gauge])],
  controllers: [MeasurementController],
  providers: [MesurementService],
})
export class MeasurementModule {}
