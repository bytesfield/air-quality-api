export interface LocationAttributes {
  id?: number;
  city: string;
  state: string;
  country: string;
  type: string;
  coordinates: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PollutionAttributes {
  id?: number;
  location_id?: number;
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WeatherAttributes {
  id?: number;
  location_id?: number;
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
  createdAt?: Date;
  updatedAt?: Date;
}
