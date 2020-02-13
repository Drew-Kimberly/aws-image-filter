import { Router, Request, Response } from 'express';
import { FilteredImageRouter } from './filteredimage/filteredimage.router';
import { requireAuth } from '../../middleware/auth';

const router: Router = Router();

router.use(requireAuth);
router.use('/filteredimage', FilteredImageRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
