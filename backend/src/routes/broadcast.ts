import { Router } from 'express';
import { broadcastController } from '../controllers/broadcastController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.post('/', authenticate, authorize('SUPER_ADMIN'), broadcastController.send);

export default router;
