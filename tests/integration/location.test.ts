import { TestCase } from "../test-case";
import * as AirVisualIntegration from '../../src/core/integrations/air-visual';
jest.mock('../../src/core/utils/logger.util.ts');
import { sequelize } from '../../src/core/database/sequelize';
import staticData from '../../src/core/static/location.static';

const testCase = new TestCase();
const urlPrefix = '/v1/location';

const coordinates = {
  longitude: 2.352222,
  latitude: 48.856613
};

const getNearestCitySuccessResponse = staticData.getNearestCitySuccessResponse;
const getNearestCityFailedResponse = staticData.getNearestCityFailedResponse;

let airVisualIntegrationMock: jest.SpyInstance;

beforeEach(() => {
  airVisualIntegrationMock = jest.spyOn(AirVisualIntegration, 'AirVisualIntegration');
  
  sequelize.transaction = jest.fn().mockImplementation(async (cb) => {
    await cb('');
  });
});

afterEach(() => {
  airVisualIntegrationMock.mockReset();
});

describe("Test Location", () => {
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
      .get(`${urlPrefix}/nearest-city?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}`)
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
      .get(`${urlPrefix}/nearest-city?longitude=${coordinates.longitude}&latitude=${coordinates.latitude}`)
      .expect(400);

    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(getNearestCityFailedResponse.message);
  });
});