export default {
  locations: {
    paris: {
      longitude: '2.352222',
      latitude: '48.856613'
    }
  },
 getNearestCitySuccessResponse: {
    status: "success",
    data: {
      city: "Makurdi",
        state: "Benue",
        country: "Nigeria",
        location: {
          type: "Point",
          coordinates: [
            7.95407,
            9.87342
          ]
        },
      current: {
        pollution: {
          ts: "2022-09-08T12:00:00.000Z",
          aqius: 50,
          mainus: "p2",
          aqicn: 24,
          maincn: "p2"
        },
        weather: {
          ts: "2022-09-08T14:00:00.000Z",
          tp: 25,
          pr: 1010,
          hu: 78,
          ws: 2.83,
          wd: 218,
          ic: "04d"
        }
      }
    }
  },
  getNearestCityFailedResponse: {
    status: false,
    error: 'bad_request',
    message: 'Location request failed.',
    gateway_response: 'getaddrinfo ENOTFOUND api.airvisual.com'
  }
};