import { TestCase } from '../test-case';
import * as AirVisualIntegration from '../../src/core/integrations/air-visual';
jest.mock('../../src/core/utils/logger.util.ts');
import { sequelize } from '../../src/core/database/sequelize';
import staticData from '../../src/core/static/location.static';
import * as locationRepository from '../../src/core/repositories/location.repository';
import * as pollutionRepository from '../../src/core/repositories/pollution.repository';
import * as weatherRepository from '../../src/core/repositories/weather.repository';

const testCase = new TestCase();
const urlPrefix = '/v1/location';
const airQualityUrl = 'air-quality';
const mostPollutedUrl = 'most-polluted-time';

const coordinates = {
  longitude: 2.352222,
  latitude: 48.856613
};

const getNearestCitySuccessResponse = staticData.getNearestCitySuccessResponse;
const getNearestCityFailedResponse = staticData.getNearestCityFailedResponse;
const findLocationResponse = staticData.findLocationResponse;
const findPollutionResponse = staticData.findPollutionResponse;

let airVisualIntegrationMock: jest.SpyInstance;
let findlocationMock: jest.SpyInstance;
let findMostPollutedMock: jest.SpyInstance;

beforeEach(() => {
  airVisualIntegrationMock = jest.spyOn(AirVisualIntegration, 'AirVisualIntegration');
  findlocationMock = jest.spyOn(locationRepository, 'findLocation');
  findMostPollutedMock = jest.spyOn(pollutionRepository, 'findMostPolluted');

  sequelize.transaction = jest.fn().mockImplementation(async (cb) => {
    await cb('');
  });
});

afterEach(() => {
  airVisualIntegrationMock.mockReset();
});

describe('Test Get Air Quality', () => {
  beforeEach(() => {
    airVisualIntegrationMock.mockImplementation((): any => {
      return {
        location: {
          getNearestCity(): any {
            return getNearestCitySuccessResponse;
          }
        }
      };
    });
  });

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

    const response = await testCase.request
      .get(`${urlPrefix}/${airQualityUrl}?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}`)
      .expect(200);

    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Air quality retrieved successfully');
    expect(response.body.status).toBe(true);
    expect(response.body.data.Result.Pollution.aqius).toBe(getNearestCitySuccessResponse.data.current.pollution.aqius);
  });

  test('can not get air quality for nearest city if an error is encountered', async () => {
    airVisualIntegrationMock.mockImplementation((): any => {
      return {
        location: {
          getNearestCity: (): any => Promise.reject(getNearestCityFailedResponse)
        }
      };
    });

    const response = await testCase.request
      .get(`${urlPrefix}/${airQualityUrl}?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}`)
      .expect(400);

    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(getNearestCityFailedResponse.message);
  });
});

describe('Test Get Most Polluted Time', () => {
  test('can get paris most polluted time', async () => {
    findlocationMock.mockImplementation(() => Promise.resolve(findLocationResponse));
    findMostPollutedMock.mockImplementation(() => Promise.resolve(findPollutionResponse));

    const response = await testCase.request.get(`${urlPrefix}/${mostPollutedUrl}`).expect(200);

    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Most polluted time retrieved successfully');
    expect(findlocationMock).toHaveBeenCalledTimes(1);
    expect(findMostPollutedMock).toHaveBeenCalledTimes(1);
  });

  test('can get most polluted time with cordinates', async () => {
    findlocationMock.mockImplementation(() => Promise.resolve(findLocationResponse));
    findMostPollutedMock.mockImplementation(() => Promise.resolve(findPollutionResponse));

    const response = await testCase.request
      .get(`${urlPrefix}/${mostPollutedUrl}?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}`)
      .expect(200);

    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Most polluted time retrieved successfully');
    expect(findlocationMock).toHaveBeenCalledTimes(2);
    expect(findMostPollutedMock).toHaveBeenCalledTimes(2);
  });
});
