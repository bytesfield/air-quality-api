import { Transaction, WhereOptions } from 'sequelize';
import { WeatherAttributes } from '../interfaces/model.interface';
import { Weather } from '../models/weathers.model';

export const createWeather= (payload: WeatherAttributes,dbTransaction?: Transaction): Promise<WeatherAttributes> => {
  return Weather.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
};

export const findWeather = (whereOptions: WhereOptions<WeatherAttributes>): Promise<WeatherAttributes | null> => {
  return Weather.findOne({ where: whereOptions });
};

export const getWeathers = (whereOptions: WhereOptions<WeatherAttributes[]>): Promise<WeatherAttributes[] | null> => {
  return Weather.findAll({ where: whereOptions });
};