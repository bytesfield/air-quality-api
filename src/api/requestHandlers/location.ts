import { RequestHandler } from 'express';
import { responseHandler } from '../../core/helpers/utilities';
import * as locationController from '../../core/controllers/location';
import { ResponseMessages } from '../../core/constants/responses';

export const getNearestCity: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const response = await locationController.getNearestCity(req.params.longitude, req.params.latitude);

    res.json(responseHandler(response, ResponseMessages.GET_NEAREST_CITY_SUCCESSFUL));
  } catch (error) {
    next(error);
  }
};
