import { RequestHandler } from 'express';
import { responseHandler } from '../../core/helpers/utilities.helper';
import * as locationController from '../../core/controllers/location.controller';
import { ResponseMessages } from '../../core/constants/responses.constant';

export const getNearestCity: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const response = await locationController.getNearestCity(req.params.longitude, req.params.latitude);

    res.json(responseHandler(response, ResponseMessages.GET_AIR_QUALITY_SUCCESSFUL));
  } catch (error) {
    next(error);
  }
};
