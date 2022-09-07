import { servicesConfiguration } from '../../config';
import { AirVisualBaseService } from './BaseService';
import { NearestCityProps, NearestCityResponseProps } from './interfaces';

/**
 * Documentation https://api-docs.iqair.com/
 *
 * @class Location
 */
export class Location {
  protected airVisualBaseService: AirVisualBaseService;

  constructor(airVisualBaseService: AirVisualBaseService) {
    this.airVisualBaseService = airVisualBaseService;
  }

  public async getNearestCity(requestData: NearestCityProps): Promise<NearestCityResponseProps> {
    const data = await this.airVisualBaseService.makeRequest<NearestCityResponseProps>({
      method: 'get',
      url: `/v2/nearest_city?lat=${requestData.lat}&lon=${requestData.lon}&key=${servicesConfiguration.air_visual.apiKey}`
    });

    return data;
  }
}
