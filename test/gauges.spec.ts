import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { GaugeService } from '@/modules/gauges/gauge.service';
import { MesurementService } from '@/modules/measurements/measurement.service';

describe('Gauge Test', () => {
  let app: INestApplication;
  let measurementService: MesurementService;
  let gaugeService: GaugeService;

  const deleteMeasurement = async (id) => {
    await measurementService.hardRemove(id);
  };

  const deleteGauge = async (id) => {
    await gaugeService.hardRemove(id);
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    measurementService = await moduleFixture.resolve(MesurementService);
    gaugeService = await moduleFixture.resolve(GaugeService);
    await app.init();
  });

  it('Find All Gauge', async () => {
    const expectedResult = await gaugeService.findAll({});
    return request(app.getHttpServer())
      .get('/gauges')
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(expectedResult));
  });

  it('Find One Gauge', async () => {
    // Create Gauge
    const testData = {
      name: 'test',
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/gauges')
      .send(testData);

    // Find Gauge
    const response = await request(app.getHttpServer()).get(
      '/gauges/' + responseCreate.body.id,
    );

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.name).toEqual(testData.name);

    // Delete Gauge
    await deleteGauge(response.body.id);
  });

  it('Create new Gauge', async () => {
    // Create Gauge
    const testData = {
      name: 'test',
    };
    const response = await request(app.getHttpServer())
      .post('/gauges')
      .send(testData);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.name).toEqual(testData.name);

    // Delete Gauge
    await deleteGauge(response.body.id);
  });

  it('Create new Gauge with Measurement', async () => {
    const testData = {
      name: 'test',
      measurements: [
        {
          datetime: new Date('2022-12-12'),
          value: 'value',
        },
      ],
    };
    const response = await request(app.getHttpServer())
      .post('/gauges')
      .send(testData);

    expect(response.body.name).toEqual(testData.name);
    response.body.measurements.map(async (item, idx) => {
      expect(item.value).toEqual(testData.measurements[idx].value);
      expect(item.datetime).toEqual(
        testData.measurements[idx].datetime.toISOString(),
      );
    });

    // Delete Gauge
    await response.body.measurements.map(async (item) => {
      await deleteMeasurement(item.id);
    });
    await deleteGauge(response.body.id);
  });

  it('Update Gauge', async () => {
    const testData = {
      name: 'test',
    };
    const createdGauge = await request(app.getHttpServer())
      .post('/gauges')
      .send(testData);

    expect(createdGauge.body.name).toEqual(testData.name);

    const updateData = {
      name: 'update',
    };
    const response = await request(app.getHttpServer())
      .put('/gauges/' + createdGauge.body.id)
      .send(updateData);

    expect(response.body.name).toEqual(updateData.name);

    // Delete Gauge
    await deleteGauge(response.body.id);
  });

  it('Delete Gauge', async () => {
    const testData = {
      name: 'test',
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/gauges')
      .send(testData);

    const response = await request(app.getHttpServer()).delete(
      '/gauges/' + responseCreate.body.id,
    );

    expect(response.statusCode).toEqual(HttpStatus.OK);

    // Delete Gauge
    await deleteGauge(responseCreate.body.id);
  });

  afterAll(async () => {
    await app.close();
  });
});
