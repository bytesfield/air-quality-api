/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import cron from 'node-cron';
import appConfig from '../config/application';
import checkAirQuality from './tasks/checkAirQuality';

const cronConfig = appConfig.cron;

const cronSwitcher = (cronExpression: string, cronTask: () => void, enabled = false): void => {
  if (enabled) cron.schedule(cronExpression, () => cronTask());
};

export const initialize = (): void => {
  cron.schedule(cronConfig.check_air_qality.cron_expression, () => checkAirQuality());

  cronSwitcher(cronConfig.check_air_qality.cron_expression, checkAirQuality, cronConfig.check_air_qality.run);
};
