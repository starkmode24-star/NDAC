import { Router } from 'express';
import { matchController } from '../controllers/matchController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', matchController.getAll);
router.get('/live', matchController.getLive);
router.get('/upcoming', matchController.getUpcoming);
router.get('/results', matchController.getResults);

// Super Admin or Scorer can create matches and update scores
router.post('/', authenticate, authorize('SUPER_ADMIN'), matchController.create);
router.post('/:id/score', authenticate, authorize('SUPER_ADMIN'), matchController.updateScore);
router.post('/:id/ball', authenticate, authorize('SUPER_ADMIN'), matchController.recordBall);

export default router;
