import { Router } from 'express';
import { getStats } from '../middleware/statcontroller';
import { getDeviation } from '../middleware/deviatecontroller';

const router = Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

export default router;
