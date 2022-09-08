import { initialize } from './core/cron/init';
import { logger } from './core/utils/logger';

initialize();

logger.info(`[Cron Started at ${new Date()}]`);
