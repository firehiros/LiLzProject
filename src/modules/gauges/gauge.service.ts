import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGaugeDto } from './dto/create.dto';
import { UpdateGaugeDto } from './dto/update.dto';
import { GetGaugeDto } from './dto/get.dto';

import { Gauge } from './entities/gauge.entity';
import { MESSAGES } from '@/helpers/messages';

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
        where: {
          id,
        },
      });

      return ret;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(dto: CreateGaugeDto) {
    try {
      const gauge = await this.gaugeRepo.save({
        ...dto,
      });
      return gauge;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdateGaugeDto) {
    try {
      const gauge = await this.gaugeRepo.findOne({
        relations: ['measurements'],
        where: {
          id,
        },
      });
      if (!gauge) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Gauge'),
          HttpStatus.BAD_REQUEST,
        );
      }
      const newGauge = await this.gaugeRepo.save({
        id: gauge.id,
        ...dto,
      });

      return newGauge;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const deleteResponse = await this.gaugeRepo.softDelete(id);
      if (!deleteResponse.affected) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Gauge'),
          HttpStatus.BAD_REQUEST,
        );
      }
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async hardRemove(id: string) {
    try {
      const deleteResponse = await this.gaugeRepo.delete(id);
      if (!deleteResponse.affected) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Gauge'),
          HttpStatus.BAD_REQUEST,
        );
      }
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
