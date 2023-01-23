import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGaugeDto } from './dto/create.dto';
import { UpdateGaugeDto } from './dto/update.dto';
import { GetGaugeDto } from './dto/get.dto';

import { Gauge } from './entities/gauge.entity';

@Injectable()
export class GaugeService {
  constructor(
    @InjectRepository(Gauge)
    private readonly gaugeRepo: Repository<Gauge>,
  ) {}

  async findAll({ search }: GetGaugeDto) {
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

      const result = await this.gaugeRepo.find({
        relations: ['measurements'],
        order: { created_at: 'DESC' },
      });

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Gauge> {
    try {
      const ret = await this.gaugeRepo.findOne({
        relations: ['measurements'],
        where: {
          id,
        },
      });

      return ret;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  create(createTypeDto: CreateGaugeDto) {
    return null;
  }

  update(id: string, updateTypeDto: UpdateGaugeDto) {
    return null;
  }

  remove(id: string) {
    return `This action removes a #${id} type`;
  }
}
