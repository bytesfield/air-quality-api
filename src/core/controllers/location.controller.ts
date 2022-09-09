import { GetAirQuality } from '../interfaces/location.interface';
import { GetNearestCityAction } from '../actions/get-nearest-city.action';

export const getAirQuality = async (longitude: string, latitude: string): Promise<GetAirQuality> => {
  const getNearestCityAction: GetNearestCityAction = new GetNearestCityAction();

    const responseData = await getNearestCityAction.execute(longitude, latitude);

    return {
      Result: {
        Pollution: responseData.data.current.pollution
      }
    };
};
