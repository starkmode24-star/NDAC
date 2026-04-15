import { Router } from 'express';
import { clubController } from '../controllers/clubController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', clubController.getAll);

// Super Admin only can manage clubs
router.post('/', authenticate, authorize('SUPER_ADMIN'), clubController.create);
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), clubController.update);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), clubController.delete);

export default router;
