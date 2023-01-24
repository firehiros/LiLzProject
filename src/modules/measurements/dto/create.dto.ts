import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { MESSAGES } from '@/helpers/messages';
import { Gauge } from '@/modules/gauges/entities/gauge.entity';
import { CreateGaugeDto } from '@/modules/gauges/dto/create.dto';

export class CreateMeasurementDto {
  // Datetime
  @ApiProperty({
    description: 'Measurement datetime',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('datetime'),
  })
  @Type(() => Date)
  @IsDate()
  datetime: Date;

  // Value
  @ApiProperty({
    description: 'Measurement value',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('value'),
  })
  value: string;

  @ApiProperty({
    description: 'Gauge Id',
  })
  @IsOptional()
  gauge?: Gauge;
}
