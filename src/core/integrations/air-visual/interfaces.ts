interface Forcasts {
  ts: string;
  aqius: number;
  aqicn: number;
  tp: number;
  tp_min: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export interface NearestCityProps {
  longitude: number;
  latitude: number;
}

export interface NearestCityResponseProps {
  status: string;
  data: {
    city: string;
    state: string;
    country: string;
    location: {
      type: string;
      coordinates: [];
    };
    forecasts: Forcasts[];
  };
}
