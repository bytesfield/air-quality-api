import { logger } from '../utils/logger';

/* eslint-disable */
require('dotenv/config');


const databaseConfig = {
  host: process.env.MYSQL_DATABASE_HOST || '127.0.0.1',
  username: process.env.MYSQL_DATABASE_USERNAME || 'root',
  password: process.env.MYSQL_DATABASE_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE_NAME || '',
  port: Number(process.env.MYSQL_DATABASE_PORT || '3306'),
  dialect: 'mysql',
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  },
  logQueryParameters: true,
  // @ts-ignore
  logging: (str) => {
    return process.env.SHOW_MYSQL_DATABASE_QUERIES === 'true' ? logger.error(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
  }
};

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig
  },
  staging: {
    ...databaseConfig
  },
  production: {
    ...databaseConfig,
    logging: false
  }
};
