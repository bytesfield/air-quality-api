import { GetAirQuality } from '../interfaces/location.interface';
import { GetNearestCityAction } from '../actions/get-nearest-city.action';
import { LocationService } from '../services/location.service';

export const getAirQuality = async (longitude: string, latitude: string): Promise<GetAirQuality> => {
  const getNearestCityAction: GetNearestCityAction = new GetNearestCityAction();

    const responseData = await getNearestCityAction.execute(longitude, latitude);

    return {
      Result: {
        Pollution: responseData.data.current.pollution
      }
    };
};

export const getMostPollutedTime = async (longitude?: string, latitude?: string): Promise<any> => {
  const getLocationService: LocationService = new LocationService();

    const responseData = await getLocationService.getMostPollutedTime(longitude, latitude);

    return {
      time: responseData.createdAt
    };
};
