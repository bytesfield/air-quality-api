import { GetNearestCityAction } from '../actions/get-nearest-city.action';
import { createOrUpdateLocation, findLocation } from '../repositories/location.repository';
import { createPollution, findMostPolluted } from '../repositories/pollution.repository';
import { createWeather } from '../repositories/weather.repository';
import { databaseTransaction } from '../database/databaseTransaction';
import { NearestCityResponseProps } from '../integrations/air-visual/interfaces';
import staticData from '../static/location.static';
import { PollutionAttributes } from '../interfaces/model.interface';

export class LocationService {

    /**
     * Process air quality
     * 
     * @param longitude string  
     * @param latitude string  
     * 
     * @returns Promise<NearestCityResponseProps> 
     */
    public async processAirQuality(longitude: string, latitude: string): Promise<NearestCityResponseProps> {
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

        return responseData;
    }

    /**
     * Process air quality
     * 
     * @param longitude string  
     * @param latitude string  
     * 
     * @returns Promise<PollutionAttributes> 
     */
    public async getMostPollutedTime(longitude?: string, latitude?: string): Promise<PollutionAttributes> {

      const requestedCoordinates = `${longitude},${latitude}`

      let location = await findLocation({coordinates: requestedCoordinates});
      let maxPolluted: PollutionAttributes;
      
      if (!location) {
        const parisCoordinates = `${staticData.locations.paris.longitude},${staticData.locations.paris.latitude}`

        const location = await findLocation({ coordinates: parisCoordinates });

        const maxPolluted = await findMostPolluted(location);

        return maxPolluted;  
      }

      maxPolluted = await findMostPolluted(location);

      return maxPolluted;

     }
}