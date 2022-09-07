import { BadRequestError } from '../errors';
import { logger } from '../utils/logger';
import { AirVisualIntegration } from '../integrations/air-visual';
import { GetNearestCity } from '../interfaces/location';

const getAirVisualInstance = (): AirVisualIntegration => {
  return new AirVisualIntegration();
};

export const getNearestCity = async (longitude: string, latitude: string): Promise<GetNearestCity> => {
  const airVisualInstance = getAirVisualInstance();

  try {
    const responseData = await airVisualInstance.location.getNearestCity({
      lon: Number(longitude),
      lat: Number(latitude)
    });

    return {
      Result: {
        Pollution: responseData.data.current.pollution
      }
    };
  } catch (error) {
    logger.error('[Error air visual get nearest city] => ', error);

    throw new BadRequestError('Location request failed.', null, {
      gateway_response: error.message,
      status: error.status
    });
  }
};
