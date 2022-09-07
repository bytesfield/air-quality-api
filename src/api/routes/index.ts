import { Router, Response, Request } from 'express';

const routes = (): Router => {
  const router = Router();
  router.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the Air Quality API.');
  });

  return router;
};

export { routes };
