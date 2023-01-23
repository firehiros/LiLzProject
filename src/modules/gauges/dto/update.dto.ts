import { PartialType } from '@nestjs/mapped-types';
import { CreateGaugeDto } from './create.dto';

export class UpdateGaugeDto extends PartialType(CreateGaugeDto) {}
