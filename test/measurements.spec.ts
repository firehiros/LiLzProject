import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MesurementService } from '@/modules/measurements/measurement.service';
import { GaugeService } from '@/modules/gauges/gauge.service';

describe('Measurements Test', () => {
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

  it('Find All Measurement', async () => {
    const expectedResult = await measurementService.findAll({});
    return request(app.getHttpServer())
      .get('/measurements')
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(expectedResult));
  });

  it('Find One Measurement', async () => {
    const testData = {
      value: 'test',
      datetime: new Date('2022-12-12'),
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/measurements')
      .send(testData);

    const response = await request(app.getHttpServer()).get(
      '/measurements/' + responseCreate.body.id,
    );

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.value).toEqual(testData.value);
    expect(response.body.datetime).toEqual(testData.datetime.toISOString());

    // Delete Measurement
    await deleteMeasurement(response.body.id);
  });

  it('Create new Measurement', async () => {
    const testData = {
      value: 'test',
      datetime: new Date('2022-12-12'),
    };
    const response = await request(app.getHttpServer())
      .post('/measurements')
      .send(testData);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.datetime).toEqual(testData.datetime.toISOString());

    // Delete Measurement
    await deleteMeasurement(response.body.id);
  });

  it('Create new Measurement with Gauge', async () => {
    // Create new Gauge
    const testGauge = { name: 'test' };
    const responseGauge = await request(app.getHttpServer())
      .post('/gauges')
      .send(testGauge);

    // Create new Measurement
    const testData = {
      value: 'test',
      datetime: new Date('2022-12-12'),
      gauge: responseGauge.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/measurements')
      .send(testData);

    // Do test
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.value).toEqual(testData.value);
    expect(response.body.gauge).toEqual(testData.gauge);
    expect(response.body.datetime).toEqual(testData.datetime.toISOString());

    // Delete Measurement
    await deleteMeasurement(response.body.id);
    await deleteGauge(responseGauge.body.id);
  });

  it('Update Measurement', async () => {
    const testData = {
      value: 'test',
      datetime: new Date('2022-12-12'),
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/measurements')
      .send(testData);

    const updateData = {
      value: 'update',
      datetime: new Date('2022-01-12'),
    };
    const response = await request(app.getHttpServer())
      .put('/measurements/' + responseCreate.body.id)
      .send(updateData);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.value).toEqual(updateData.value);
    expect(response.body.datetime).toEqual(updateData.datetime.toISOString());

    // Delete Measurement
    await deleteMeasurement(response.body.id);
  });

  it('Delete Measurement', async () => {
    const testData = {
      value: 'test',
      datetime: new Date('2022-12-12'),
    };
    const responseCreate = await request(app.getHttpServer())
      .post('/measurements')
      .send(testData);

    const response = await request(app.getHttpServer()).delete(
      '/measurements/' + responseCreate.body.id,
    );

    expect(response.statusCode).toEqual(HttpStatus.OK);
    await deleteMeasurement(responseCreate.body.id);
  });

  afterAll(async () => {
    await app.close();
  });
});
