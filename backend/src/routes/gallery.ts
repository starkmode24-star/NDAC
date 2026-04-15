import { Router } from 'express';
import { galleryController } from '../controllers/galleryController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', galleryController.getAll);

router.post('/', authenticate, authorize('SUPER_ADMIN'), galleryController.create);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), galleryController.delete);

export default router;
