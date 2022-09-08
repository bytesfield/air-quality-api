import { GetNearestCityAction } from '../actions/get-nearest-city.action';
import { createOrUpdateLocation } from '../repositories/location.repository';
import { createPollution } from '../repositories/pollution.repository';
import { createWeather } from '../repositories/weather.repository';
import { databaseTransaction } from '../database/databaseTransaction';

export class LocationService {
    public async processAirQuality(longitude: string, latitude: string) {
        const getNearestCityAction: GetNearestCityAction = new GetNearestCityAction();

        const responseData = await getNearestCityAction.execute(longitude, latitude);
        
        await databaseTransaction(async (dbTransaction) => {
            const createdLocation = await createOrUpdateLocation(
              {
                city: responseData.data.city,
                state: responseData.data.state,
                country: responseData.data.country,
                type: responseData.data.location.type,
                coordinates: responseData.data.location.coordinates.toString()
              },
              dbTransaction
            );
      
            await createPollution(
              {
                location_id: createdLocation.id,
                ts: responseData.data.current.pollution.ts,
                aqius: responseData.data.current.pollution.aqius,
                mainus: responseData.data.current.pollution.mainus,
                aqicn: responseData.data.current.pollution.aqicn,
                maincn: responseData.data.current.pollution.maincn
              },
              dbTransaction
            );

            await createWeather(
                {
                  location_id: createdLocation.id,
                  ts: responseData.data.current.weather.ts,
                  tp: responseData.data.current.weather.tp,
                  pr: responseData.data.current.weather.pr,
                  hu: responseData.data.current.weather.hu,
                  ws: responseData.data.current.weather.ws,
                  wd: responseData.data.current.weather.wd,
                  ic: responseData.data.current.weather.ic
                },
                dbTransaction
              );
          });
    }
}