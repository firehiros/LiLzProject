import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './index';

export const typeOrmConfig: TypeOrmModule = {
  type: 'mysql',
  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
  logging: true,
};
