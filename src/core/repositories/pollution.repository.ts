import { Transaction, WhereOptions, Sequelize, Op } from 'sequelize';
import { LocationAttributes, PollutionAttributes } from '../interfaces/model.interface';
import { Pollution } from '../models/pollutions.model';
import { Location } from '../models/locations.model';

export const createPollution = (payload: PollutionAttributes, dbTransaction?: Transaction): Promise<PollutionAttributes> => {
  return Pollution.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
};

export const findPollution = (whereOptions: WhereOptions<PollutionAttributes>): Promise<PollutionAttributes | null> => {
  return Pollution.findOne({ where: whereOptions, include: Location });
};

export const findMostPolluted = (location: LocationAttributes): Promise<PollutionAttributes | null> => {
  return Pollution.findOne({
    where: {
      location_id: location.id,
      aqicn: [Sequelize.literal('SELECT MAX(aqicn) FROM pollutions GROUP BY location_id')]
    }
  });
};

export const getPollutions = (whereOptions: WhereOptions<PollutionAttributes[]>): Promise<PollutionAttributes[] | null> => {
  return Pollution.findAll({ where: whereOptions });
};
