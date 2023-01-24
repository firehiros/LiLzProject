import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMeasurementDto } from './dto/create.dto';
import { UpdateMeasurementDto } from './dto/update.dto';
import { GetMeasurementDto } from './dto/get.dto';

import { Measurement } from './entities/measurement.entity';
import { MESSAGES } from '@/helpers/messages';

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

  async create(dto: CreateMeasurementDto) {
    try {
      const measurement = await this.measurementRepo.save({
        ...dto,
      });
      return measurement;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdateMeasurementDto) {
    try {
      const measurement = await this.measurementRepo.findOne({
        relations: ['gauge'],
        where: {
          id,
        },
      });
      if (!measurement) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Measurement'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const newMeasurement = await this.measurementRepo.save({
        id: measurement.id,
        ...dto,
      });
      return newMeasurement;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const deleteResponse = await this.measurementRepo.softDelete(id);
      if (!deleteResponse.affected) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Measurement'),
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
      const deleteResponse = await this.measurementRepo.delete(id);
      if (!deleteResponse.affected) {
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Measurement'),
          HttpStatus.BAD_REQUEST,
        );
      }
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
