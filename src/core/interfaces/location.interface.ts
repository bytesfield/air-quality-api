export interface GetAirQuality {
  Result: {
    Pollution: {
      ts: string;
      aqius: number;
      mainus: string;
      aqicn: number;
      maincn: string;
    };
  };
}
