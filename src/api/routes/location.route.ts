import { Router } from 'express';
import * as locationRequestHandler from '../requestHandlers/location.handler';

const router = Router();

router.get('/air-quality', locationRequestHandler.getAirQuality);

export { router as locationRoutes };
