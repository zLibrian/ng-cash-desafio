import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  // host: process.env.DB_HOST || 'db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password123',
  database: process.env.DB_NAME || 'ng_cash',
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = config;
