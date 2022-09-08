import { LocationService } from '../../../core/services/location.service';
import { logger } from '../../utils/logger';
import location from '../../../core/static/location.static';

const handler = async (): Promise<void> => {
  const locationService: LocationService = new LocationService();

  try {
    logger.info(`[Process Air Quality]: Started at ${new Date()}`);

    await locationService.processAirQuality(location.locations.paris.longitude, location.locations.paris.latitude);

    logger.info(`[Process Air Quality]: Completed at ${new Date()}`);
  } catch (error) {
    logger.error('[Error processing air quality] ', error);
  }
};

export default handler;
