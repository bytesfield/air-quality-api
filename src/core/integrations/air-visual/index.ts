import { servicesConfiguration } from '../../config';
import { AirVisualBaseService } from './BaseService';
import { Location } from './Location';

export class AirVisualIntegration {
  public location: Location;

  public constructor() {
    const { baseUrl } = servicesConfiguration.air_visual;

    const baseService = new AirVisualBaseService(baseUrl);

    this.location = new Location(baseService);
  }
}
