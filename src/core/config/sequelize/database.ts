import { logger } from '../../utils/logger.util';

const sequelizeConfig = {
  host: process.env.MYSQL_DATABASE_HOST || '127.0.0.1',
  username: process.env.MYSQL_DATABASE_USERNAME || 'root',
  password: process.env.MYSQL_DATABASE_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE_NAME || 'air_visual',
  port: process.env.MYSQL_DATABASE_PORT || '3306',
  'migrations-path': '../../../core/database/migrations',
  'seeders-path': '../../../core/database/seeders',
  dialect: 'mysql',
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true
  },
  logQueryParameters: true,
  logging: (str: string): any => {
    return process.env.SHOW_SQL_LOGS ? logger.info(`[SEQUELIZE DATABASE] ${str}`) : null;
  }
};

export const development = { ...sequelizeConfig };

export const test = {
  ...sequelizeConfig,
  username: process.env.MYSQL_TEST_DATABASE_USERNAME || 'root',
  password: process.env.MYSQL_TEST_DATABASE_PASSWORD || 'root',
  database: process.env.MYSQL_TEST_DATABASE_NAME || 'air_visual'
};

export const staging = { ...sequelizeConfig };

export const production = { ...sequelizeConfig, logging: false };
