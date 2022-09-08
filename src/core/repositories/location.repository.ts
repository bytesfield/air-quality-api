import { Transaction, WhereOptions } from 'sequelize';
import { LocationAttributes } from '../interfaces/model';
import { Location } from '../models/locations';

export const createLocation= (payload: LocationAttributes,dbTransaction?: Transaction): Promise<LocationAttributes> => {
  return Location.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
};

export const createOrUpdateLocation = async (
    payload: LocationAttributes,
    dbTransaction?: Transaction
  ): Promise<LocationAttributes> => {
    const [log] = await Location.upsert(payload, { returning: true, ...(dbTransaction && { transaction: dbTransaction }) });
  
    return log;
  };

export const findLocation = (whereOptions: WhereOptions<LocationAttributes>): Promise<LocationAttributes | null> => {
  return Location.findOne({ where: whereOptions });
};

export const getLocations = (whereOptions: WhereOptions<LocationAttributes[]>): Promise<LocationAttributes[] | null> => {
  return Location.findAll({ where: whereOptions });
};