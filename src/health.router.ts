import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/health', async (req: Request, res: Response) => {
  res.send(`OK`);
});

export const HealthRouter: Router = router;
