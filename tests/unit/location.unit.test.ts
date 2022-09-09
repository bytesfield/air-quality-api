import { TestCase } from "../test-case";
import * as AirVisualIntegration from '../../src/core/integrations/air-visual';
jest.mock('../../src/core/utils/logger.util.ts');
import { sequelize } from '../../src/core/database/sequelize';
import staticData from '../../src/core/static/location.static';
import { GetNearestCityAction } from "../../src/core/actions/get-nearest-city.action";
import { LocationService } from "../../src/core/services/location.service";
import { BadRequestError } from "../../src/core/errors";
import { LocationErrors } from "../../src/core/constants/errors.constant";
import * as locationRepository from "../../src/core/repositories/location.repository";
import * as pollutionRepository from "../../src/core/repositories/pollution.repository";
import * as weatherRepository from "../../src/core/repositories/weather.repository";

const getNearestCitySuccessResponse = staticData.getNearestCitySuccessResponse;
const getNearestCityFailedResponse = staticData.getNearestCityFailedResponse;
const findLocationResponse = staticData.findLocationResponse;
const findPollutionResponse = staticData.findPollutionResponse;
const findWeatherResponse = staticData.findWeatherResponse;

const coordinates = {
  longitude: '2.352222',
  latitude: '48.856613'
};

let airVisualIntegrationMock: jest.SpyInstance;
let getNearestCityActionMock: jest.SpyInstance;
let getLocationServiceMock: jest.SpyInstance;
let createOrUpdatelocationMock: jest.SpyInstance;
let createPollutionMock: jest.SpyInstance;
let createWeatherMock: jest.SpyInstance;

let getNearestCityActionInstance = new GetNearestCityAction();
let getLocationServiceInstance = new LocationService();

beforeEach(() => {
  airVisualIntegrationMock = jest.spyOn(AirVisualIntegration, 'AirVisualIntegration');
  getNearestCityActionMock = jest.spyOn(getNearestCityActionInstance, 'execute');
  getLocationServiceMock = jest.spyOn(getLocationServiceInstance, 'processAirQuality');
  createOrUpdatelocationMock = jest.spyOn(locationRepository, 'createOrUpdateLocation');
  createPollutionMock = jest.spyOn(pollutionRepository, 'createPollution');
  createWeatherMock = jest.spyOn(weatherRepository, 'createWeather');
  
  sequelize.transaction = jest.fn().mockImplementation(async (cb) => {
    await cb('');
  });
});

afterEach(() => {
  airVisualIntegrationMock.mockReset();
});

describe("Test nearest City Action", () => {

  test('can get air quality for nearest city', async () => {
    airVisualIntegrationMock.mockImplementation((): any => {
      return {
        location: {
          getNearestCity(): any {
            return getNearestCitySuccessResponse;
          }
        }
      };
    });

    await expect(
      getNearestCityActionInstance.execute(coordinates.longitude, coordinates.latitude)
    ).resolves.toMatchObject(getNearestCitySuccessResponse);

    expect(airVisualIntegrationMock).toHaveBeenCalledTimes(1);
  });

  test('can not get air quality for nearest city if an error is encountered', async () => {
    airVisualIntegrationMock.mockImplementation((): any => {
      return {
        location: {
          getNearestCity: (): any => Promise.reject(getNearestCityFailedResponse)
        }
      };
    });

    await expect(
      getNearestCityActionInstance.execute(coordinates.longitude, coordinates.latitude)
    ).rejects.toThrow(new BadRequestError(LocationErrors.LOCATION_REQUEST_FAILED));

    expect(airVisualIntegrationMock).toHaveBeenCalledTimes(1);
  });
});

describe("Test for location service", () => {
  test('can process air quality successfully', async () => {
    createOrUpdatelocationMock.mockImplementation(() => Promise.resolve(findLocationResponse));
    createPollutionMock.mockImplementation(() => Promise.resolve(findPollutionResponse));
    createWeatherMock.mockImplementation(() => Promise.resolve(findWeatherResponse));

    airVisualIntegrationMock.mockImplementation((): any => {
      return {
        location: {
          getNearestCity(): any {
            return getNearestCitySuccessResponse;
          }
        }
      };
    });

    await expect(
      getLocationServiceInstance.processAirQuality(coordinates.longitude, coordinates.latitude)
    ).resolves.toMatchObject(getNearestCitySuccessResponse);

    expect(airVisualIntegrationMock).toHaveBeenCalledTimes(1);
    expect(createOrUpdatelocationMock).toHaveBeenCalledTimes(1);
    expect(createPollutionMock).toHaveBeenCalledTimes(1);
    expect(createWeatherMock).toHaveBeenCalledTimes(1);
  });
});