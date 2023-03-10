import { config } from 'dotenv';

config();
export const PORT = process.env.PORT;
export const GMT_8_TIMEZONE = 'Asia/Hong_Kong';

export const DATABASE_CONFIG = {
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_HOST || '',
  port: process.env.DATABASE_PORT || 3306,
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
};

export const APP_URL = process.env.APP_URL;
export const API_PREFIX = `/api/${process.env.APP_VERSION}`;
export const FRONTEND_HOST = process.env.HOST_NAME;
