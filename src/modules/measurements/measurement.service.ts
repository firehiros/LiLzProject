import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMeasurementDto } from './dto/create.dto';
import { UpdateMeasurementDto } from './dto/update.dto';
import { GetMeasurementDto } from './dto/get.dto';

import { Measurement } from './entities/measurement.entity';

@Injectable()
export class MesurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepo: Repository<Measurement>,
  ) {}

  async findAll({ search }: GetMeasurementDto) {
    try {
      const searchQuery = {};
      if (search) {
        const parseSearchParams = search.split(';');
        for (const searchParam of parseSearchParams) {
          const [key, value] = searchParam.split(':');
          if (key.includes('.')) {
            const [mainKey, subKey] = key.split('.');
            searchQuery[mainKey] = { [subKey]: value };
          } else {
            searchQuery[key] = value;
          }
        }
      }

      const result = await this.measurementRepo.find({
        relations: ['gauge'],
        order: { created_at: 'DESC' },
      });

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Measurement> {
    try {
      const ret = await this.measurementRepo.findOne({
        relations: ['gauge'],
        where: {
          id,
        },
      });

      return ret;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  create(createTypeDto: CreateMeasurementDto) {
    return null;
  }

  update(id: string, updateTypeDto: UpdateMeasurementDto) {
    return null;
  }

  remove(id: string) {
    return `This action removes a #${id} type`;
  }
}
