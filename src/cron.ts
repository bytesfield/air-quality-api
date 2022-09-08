import { initialize } from './core/cron/init';
import { logger } from './core/utils/logger.util';

initialize();

logger.info(`[Cron Started at ${new Date()}]`);
