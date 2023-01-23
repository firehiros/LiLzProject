import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GaugeService } from './gauge.service';
import { GaugeController } from './gauge.controller';
import { Gauge } from './entities/gauge.entity';
import { Measurement } from '@/modules/measurements/entities/measurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement, Gauge])],
  controllers: [GaugeController],
  providers: [GaugeService],
})
export class MeasurementModule {}
