import { BadRequestError } from '../errors';
import { AirVisualIntegration } from '../integrations/air-visual';
import { NearestCityResponseProps } from '../integrations/air-visual/interfaces';
import { logger } from '../utils/logger.util';

export class GetNearestCityAction {

    public async execute(longitude: string, latitude: string): Promise<NearestCityResponseProps>  {
        const getAirVisualInstance = (): AirVisualIntegration => {
            return new AirVisualIntegration();
          };

          const airVisualInstance = getAirVisualInstance();

          try {
            const responseData = await airVisualInstance.location.getNearestCity({
              lon: Number(longitude),
              lat: Number(latitude)
            });
        
            return responseData;
          } catch (error) {
            logger.error('[Error air visual get nearest city] => ', error);
        
            throw new BadRequestError('Location request failed.', null, {
              gateway_response: error.message,
              status: error.status
            });
          }
    }
}