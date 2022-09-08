import { GetNearestCity } from '../interfaces/location';
import { GetNearestCityAction } from '../actions/get-nearest-city.action';

export const getNearestCity = async (longitude: string, latitude: string): Promise<GetNearestCity> => {
  const getNearestCityAction: GetNearestCityAction = new GetNearestCityAction();

    const responseData = await getNearestCityAction.execute(longitude, latitude);

    return {
      Result: {
        Pollution: responseData.data.current.pollution
      }
    };
};
