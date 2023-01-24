import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MESSAGES } from '@/helpers/messages';
import { Measurement } from '@/modules/measurements/entities/measurement.entity';
import { CreateMeasurementDto } from '@/modules/measurements/dto/create.dto';

export class CreateGaugeDto {
  @ApiProperty({
    description: 'Gauge name',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('value'),
  })
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'Measurements',
    type: CreateMeasurementDto,
  })
  measurements?: Measurement[];
}
