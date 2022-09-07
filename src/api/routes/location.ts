import { Router } from 'express';
import * as locationRequestHandler from '../requestHandlers/location';

const router = Router();

router.get('/nearest-city', locationRequestHandler.getNearestCity);

export { router as locationRoutes };
