import { Router, Response, Request } from 'express';
import { locationRoutes } from './location.route';

const routes = (): Router => {
  const router = Router();
  router.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the Air Quality API.');
  });

  router.use('/v1/location', locationRoutes);

  return router;
};

export { routes };
