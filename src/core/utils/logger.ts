import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      silent: process.env.NODE_ENV === 'test'
    }),
    new winston.transports.File({ filename: 'logs/combined.log', silent: process.env.NODE_ENV === 'test' })
  ]
});

if (process.env.SHOW_APPLICATION_LOGS === 'true') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export { logger };
