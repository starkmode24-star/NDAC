import { Router } from 'express';
import { leagueController } from '../controllers/leagueController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', leagueController.getAll);
router.get('/:id/standings', leagueController.getStandings);

router.post('/', authenticate, authorize('SUPER_ADMIN'), leagueController.create);

export default router;
