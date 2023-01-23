import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasurementDto } from './create.dto';

export class UpdateMeasurementDto extends PartialType(CreateMeasurementDto) {}
