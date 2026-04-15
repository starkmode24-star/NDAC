import { Router } from 'express';
import { newsController } from '../controllers/newsController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', newsController.getAll);

router.post('/', authenticate, authorize('SUPER_ADMIN'), newsController.create);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), newsController.delete);

export default router;
