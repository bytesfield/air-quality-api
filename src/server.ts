/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { logger } from './core/utils/logger.util';

const startApp = async (): Promise<void> => {
  app.listen(process.env.APP_PORT, () => {
    logger.info(`
        #################################################
        🛡️ App listening on port: ${process.env.APP_PORT} 🛡️ 
        #################################################
    `);
  });
};

startApp();
