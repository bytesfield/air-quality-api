import { Transaction, WhereOptions } from 'sequelize';
import { PollutionAttributes } from '../interfaces/model.interface';
import { Pollution } from '../models/pollutions.model';

export const createPollution= (payload: PollutionAttributes,dbTransaction?: Transaction): Promise<PollutionAttributes> => {
  return Pollution.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
};

export const findPollution = (whereOptions: WhereOptions<PollutionAttributes>): Promise<PollutionAttributes | null> => {
  return Pollution.findOne({ where: whereOptions });
};

export const getPollutions = (whereOptions: WhereOptions<PollutionAttributes[]>): Promise<PollutionAttributes[] | null> => {
  return Pollution.findAll({ where: whereOptions });
};