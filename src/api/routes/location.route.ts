import { Router } from 'express';
import * as locationRequestHandler from '../requestHandlers/location.handler';

const router = Router();

router.get('/air-quality', locationRequestHandler.getAirQuality);
router.get('/most-polluted-time', locationRequestHandler.getMostPollutedTime);

export { router as locationRoutes };
